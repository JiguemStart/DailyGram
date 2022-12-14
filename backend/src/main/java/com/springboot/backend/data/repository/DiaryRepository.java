package com.springboot.backend.data.repository;

import com.springboot.backend.data.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Page<Diary> findAllByMemberId(Long memberId, Pageable pageable);


    List<Diary> findAllByMemberId(Long memberId);
}
