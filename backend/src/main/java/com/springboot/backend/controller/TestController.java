package com.springboot.backend.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @ApiOperation(value = "GET 메서드 예제", notes = "@RequestParam을 활용한 GET Method")
    @GetMapping(value = "/request1")
    public String getRequestParam1(
            @ApiParam(value = "이름", required = true) @RequestParam String name,
            @ApiParam(value = "이메일", required = true) @RequestParam String email,
            @ApiParam(value = "회사", required = true) @RequestParam String organization) {
        LOGGER.info("request1 메서드가 호출되었습니다.");
        return name + " " + email + " " + organization;
    }
    // ApiOperation : Method 설명
    // ApiParam : 매개변수에 대한 설명 및 설정을 위한 어노테이션. 메서드의 매개변수 뿐아니라 DTO 클래스 내의 매개변수에도 정의 가능
    // required : 필수로 채워야 하는 지에 대한 설명
    @GetMapping(value = "/variable1/{variable}")
    public String getVariable1(@PathVariable String variable) {
        LOGGER.info("@PathVariable을 통해 들어온 값 : {}", variable);
        return variable;
    }
}
