package com.company;
import javax.swing.*;

public class Car {

    // 핃드들
    // private은 해당 클래스 안에서만 접근이 가능하다 public은 외부에서도 접근이 가능
    private int doors;
    private int wheels;
    private String model;
    private String engine;
    private String color;

    public void setModel(String model) {
        String validModel = model.toLowerCase();

        if(validModel.equals("carrera") || validModel.equals(("commodore"))) {
            // 메소드를 이용해 model 업데이트 하기
            this.model = model;
        } else {
            this.model = "unknown";
        }
    }

    public String getModel() {
        return this.model;
    }
}
