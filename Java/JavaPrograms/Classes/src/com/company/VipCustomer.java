package com.company;

public class VipCustomer {

    private String name;
    private long creditLimit;
    private String email;

    public VipCustomer(String name, long creditLimit, String email) {
        this.name = name;
        this.creditLimit = creditLimit;
        this.email = email;
    }

    public VipCustomer(String email) {
        this("Jay", 5000, email);
    }

    public VipCustomer() {
        this("Tim", 7000,";lkj@naver.com");
    }

    public String getName() {
        return "His name is " + this.name;
    }

    public long getCreditLimit() {
        return this.creditLimit;
    }

    public String getEmail() {
        return "His email is " + this.email;
    }
}
