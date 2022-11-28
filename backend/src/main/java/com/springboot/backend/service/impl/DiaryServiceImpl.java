package com.springboot.backend.service.impl;

import com.springboot.backend.data.dto.DiaryDto;
import com.springboot.backend.data.dto.DiaryResponseDto;
import com.springboot.backend.data.entity.Diary;
import com.springboot.backend.data.entity.Member;
import com.springboot.backend.data.entity.Token;
import com.springboot.backend.data.repository.DiaryRepository;
import com.springboot.backend.data.repository.MemberRepository;
import com.springboot.backend.data.repository.TokenRepository;
import com.springboot.backend.result.ConnectResult;
import com.springboot.backend.service.DiaryService;
import com.springboot.backend.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryServiceImpl implements DiaryService {

    private final SecurityService securityService;
    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
    private final DiaryRepository diaryRepository;


    @Autowired
    public DiaryServiceImpl(SecurityService securityService,
                            MemberRepository memberRepository,
                            TokenRepository tokenRepository,
                            DiaryRepository diaryRepository) {
        this.securityService = securityService;
        this.memberRepository = memberRepository;
        this.tokenRepository = tokenRepository;
        this.diaryRepository = diaryRepository;
    }

    @Override
    public ConnectResult confrimToken(String accessToken, String refreshToken) {
        String resultEmail = null;
        try {
            resultEmail = securityService.getSubject1(accessToken); // Access Token 먼저검증해봐
        } catch (Exception e) { // 만약 Access Token 값이 만료되었으면,
            Optional<Token> tokenOptional = tokenRepository.findByAccessToken(accessToken);
            // 토큰쌍에 조회가되는놈이면, Refresh Token으로 검증해보자
            if (tokenOptional.isPresent()) { // refreshToken이랑 accessToken 이랑 한쌍이면,
                if (tokenOptional.get().getRefreshToken().equals(refreshToken)) {
                    // access token 새로 발급해주고 한쌍으로 묶어주자
                    // 그전에 refresh token으로 email을 구하자

                    String tempEmail = null;
                    try {
                        tempEmail = securityService.getSubject2(refreshToken);
                    } catch (Exception ex) {
                        throw new RuntimeException(ex);
                    }


                    String newAccessToken = securityService.createToken1(tempEmail, (2*60*1000*60)); // 2시간짜리 토큰
                    //  Access Token 새로 발급해주어야한다.
                    Token token = tokenOptional.get();
                    token.setAccessToken(newAccessToken);
                    tokenRepository.save(token);
                    // 토큰쌍도 Update 완료



                    return new ConnectResult(true, newAccessToken);
                    // 그리고 통과할수있도록 true랑 새로운 Access token 던져주자
                }
            } else { // refreshToken이랑 accessToken이랑 맞는것도 아니고, accesstoken에 맞는 RT도 없다면
                return new ConnectResult(false, null); // false 리턴
            }
        }
        // AT 검증했는데, Email(Subject)이 잘나왔어.
        if (memberRepository.findByEmail(resultEmail).isPresent()) { //
            return new ConnectResult(true, null); // 잘 나왔으면 true
        } else {
            return new ConnectResult(false, null); // 이상한값 입력했으면 false
        }

    }

    @Override
    public boolean createDiary(DiaryDto diaryDto) {
        Diary diary = new Diary();
        diary.setContent(diaryDto.getContent());
        diary.setDate(diaryDto.getDate());
        diary.setFeeling(diaryDto.getFeeling());
        diary.setTitle(diaryDto.getTitle());
        diary.setWeather(diaryDto.getWeather());
        diary.setMember(memberRepository.findById(diaryDto.getMemberId()).get());

        diaryRepository.save(diary);

        return true;
    }

    @Override
    public List<DiaryResponseDto> getDiaryList(String email, Integer page) {

        Long memberId = memberRepository.findByEmail(email).get().getId();

        Page<Diary> diaryPage = diaryRepository.findAllByMemberId(memberId, PageRequest.of(page-1,12, Sort.by(Sort.Direction.DESC, "CreatedAt")));
        // 생성순 DESC로 정렬되어 페이징처리    // pageable의 구현체 = PageRequest

        List<Diary> diaries = diaryPage.getContent();
        List<DiaryResponseDto> diaryResponseDtoList = new ArrayList<>();

        for(Diary diary : diaries) {
            DiaryResponseDto dto = DiaryResponseDto.builder()
                    .id(diary.getId())
                    .content(diary.getContent())
                    .date(diary.getDate())
                    .feeling(diary.getFeeling())
                    .title(diary.getTitle())
                    .weather(diary.getWeather())
                    .memberId(diary.getMember().getId())
                    .createdAt(diary.getCreatedAt())
                    .updatedAt(diary.getUpdatedAt())
                    .build();

            diaryResponseDtoList.add(dto);
        }
        return diaryResponseDtoList;
    }

    @Override
    public DiaryResponseDto getDiaryDetail(Long diaryNum) {

        Diary diary = diaryRepository.findById(diaryNum).get();
        DiaryResponseDto diaryResponseDto = new DiaryResponseDto();

        diaryResponseDto.setId(diary.getId());
        diaryResponseDto.setContent(diary.getContent());
        diaryResponseDto.setDate(diary.getDate());
        diaryResponseDto.setFeeling(diary.getFeeling());
        diaryResponseDto.setTitle(diary.getTitle());
        diaryResponseDto.setWeather(diary.getWeather());
        diaryResponseDto.setCreatedAt(diary.getCreatedAt());
        diaryResponseDto.setUpdatedAt(diary.getUpdatedAt());
        diaryResponseDto.setMemberId(diary.getMember().getId());

        return diaryResponseDto;
    }

    @Override
    public Integer getDiaryNum(String email) {
        // email에 딸린 memberId 부터 찾고, memberId로 갯수반환해주자

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Long memberId = optionalMember.get().getId();
            List<Diary> diaries = diaryRepository.findAllByMemberId(memberId);
            Integer num = diaries.size();
            return num;

        } else {
            return 0;
        }
    }

    @Override
    public boolean deleteDiary(Long diaryId) {
        Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
        if (optionalDiary.isEmpty()) {
            return false;
        } else {
            diaryRepository.deleteById(diaryId);
            return true;
        }

    }
}
