package com.springboot.backend.service.impl;

import com.springboot.backend.data.dto.DiaryDto;
import com.springboot.backend.data.dto.DiaryResponseDto;
import com.springboot.backend.data.entity.Diary;
import com.springboot.backend.data.entity.Member;
import com.springboot.backend.data.entity.Token;
import com.springboot.backend.data.repository.DiaryRepository;
import com.springboot.backend.data.repository.MemberRepository;
import com.springboot.backend.data.repository.TokenRepository;
import com.springboot.backend.result.*;
import com.springboot.backend.service.DiaryService;
import com.springboot.backend.service.SecurityService;
import com.springboot.backend.service.TokenConfirmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.token.TokenService;
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
    private final TokenConfirmService tokenConfirmService;


    @Autowired
    public DiaryServiceImpl(SecurityService securityService,
                            MemberRepository memberRepository,
                            TokenRepository tokenRepository,
                            DiaryRepository diaryRepository,
                            TokenConfirmService tokenConfirmService) {
        this.securityService = securityService;
        this.memberRepository = memberRepository;
        this.tokenRepository = tokenRepository;
        this.diaryRepository = diaryRepository;
        this.tokenConfirmService = tokenConfirmService;
    }

//    @Override
//    public ConnectResult confrimToken(String accessToken, String refreshToken) {
//        String resultEmail = null;
//        try {
//            resultEmail = securityService.getSubject1(accessToken); // Access Token 먼저검증해봐
//        } catch (Exception e) { // 만약 Access Token 값이 만료되었으면,
//            Optional<Token> tokenOptional = tokenRepository.findByAccessToken(accessToken);
//            // 토큰쌍에 조회가되는놈이면, Refresh Token으로 검증해보자
//            if (tokenOptional.isPresent()) { // refreshToken이랑 accessToken 이랑 한쌍이면,
//                if (tokenOptional.get().getRefreshToken().equals(refreshToken)) {
//                    // access token 새로 발급해주고 한쌍으로 묶어주자
//                    // 그전에 refresh token으로 email을 구하자
//
//                    String tempEmail = null;
//                    try {
//                        tempEmail = securityService.getSubject2(refreshToken);
//                    } catch (Exception ex) {
//                        throw new RuntimeException(ex);
//                    }
//
//                    String newAccessToken = securityService.createToken1(tempEmail, (2*60*1000*60)); // 2시간짜리 토큰
//                    //  Access Token 새로 발급해주어야한다.
//                    Token token = tokenOptional.get();
//                    token.setAccessToken(newAccessToken);
//                    tokenRepository.save(token);
//                    // 토큰쌍도 Update 완료
//
//                    return new ConnectResult(true, newAccessToken);
//                    // 그리고 통과할수있도록 true랑 새로운 Access token 던져주자
//                }
//            } else { // refreshToken이랑 accessToken이랑 맞는것도 아니고, accesstoken에 맞는 RT도 없다면
//                return new ConnectResult(false, null); // false 리턴
//            }
//        }
//        // AT 검증했는데, Email(Subject)이 잘나왔어.
//        if (memberRepository.findByEmail(resultEmail).isPresent()) { //
//            return new ConnectResult(true, null); // 잘 나왔으면 true
//        } else {
//            return new ConnectResult(false, null); // 이상한값 입력했으면 false
//        }
//
//    }

    @Override
    public ConnectResult createDiary(DiaryDto diaryDto, String accessToken, String refreshToken) {



        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Diary diary = new Diary();

            diary.setContent(diaryDto.getContent());
            diary.setDate(diaryDto.getDate());
            diary.setFeeling(diaryDto.getFeeling());
            diary.setTitle(diaryDto.getTitle());
            diary.setWeather(diaryDto.getWeather());

            diary.setMember(memberRepository.findByEmail(connectResult.getEmail()).get());
            diaryRepository.save(diary);
        }

        return connectResult;

    }

    @Override
    public String getPasswordQuestionByEmail(String email) {

            Optional<Member> optionalMember = memberRepository.findByEmail(email);
            String result = null;
            if (optionalMember.isPresent()) {
                result = optionalMember.get().getPasswordQuestion();
            }
            return result;


    }

    @Override
    public DairyListResult getDiaryList(String accessToken, String refreshToken, Integer page) {

        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Long memberId = memberRepository.findByEmail(connectResult.getEmail()).get().getId();

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
            return new DairyListResult<>(true, connectResult.getNewAccessToken(), diaryResponseDtoList);

        } else { // 토큰만료었으면
            return new DairyListResult<>(false, null, null); // 다시로그인해라, 나타내야한다
        }


    }

    @Override
    public DairyDetailResult getDiaryDetail(Long diaryNum, String accessToken, String refreshToken) {

        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,

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

            return new DairyDetailResult<>(true, connectResult.getNewAccessToken(), diaryResponseDto);
        } else {
            return new DairyDetailResult<>(false, null, null);
        }


    }

    @Override
    public DairyNumResult getDiaryNum(String accessToken, String refreshToken) {
        // email에 딸린 memberId 부터 찾고, memberId로 갯수반환해주자

        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Optional<Member> optionalMember = memberRepository.findByEmail(connectResult.getEmail());
            if (optionalMember.isPresent()) {
                Long memberId = optionalMember.get().getId();
                List<Diary> diaries = diaryRepository.findAllByMemberId(memberId);
                Integer num = diaries.size();
                return new DairyNumResult(true, connectResult.getNewAccessToken(), num);
            } else {
                return new DairyNumResult(true, connectResult.getNewAccessToken(), 0);
            }
        } else {
            return new DairyNumResult(false, null, null);
        }



    }

    @Override
    public DairyDeleteResult deleteDiary(Long diaryId, String accessToken, String refreshToken) {

        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
            if (optionalDiary.isEmpty()) {
                return new DairyDeleteResult(true, connectResult.getNewAccessToken(),false);
            } else {
                diaryRepository.deleteById(diaryId);
                return new DairyDeleteResult(true, connectResult.getNewAccessToken(),true);
            }

        } else {
            return new DairyDeleteResult(false, null,false);
        }


    }

    @Override
    public MemberInfoResult getPasswordQuestion(String accessToken, String refreshToken) {

        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Optional<Member> optionalMember = memberRepository.findByEmail(connectResult.getEmail());
            String result = null;
            if (optionalMember.isPresent()) {
                result = optionalMember.get().getPasswordQuestion();
            }
            return new MemberInfoResult(true, connectResult.getNewAccessToken(), result);
        } else {
            return new MemberInfoResult(false, connectResult.getNewAccessToken() ,null);
        }


    }


}
