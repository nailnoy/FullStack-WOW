package com.myapp;
 
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
 
// 컨트럴러 어트리뷰트
@Controller
public class AjaxController {
  // 요청 매핑 어트리뷰트
  @RequestMapping(value = "/data/hello.json")
  // String의 데이터
  @ResponseBody
  public String helloworld(Model model) {
    // 결과는 hello world
    return "hello world";
  }
}