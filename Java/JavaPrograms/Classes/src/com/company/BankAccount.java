package com.company;

public class BankAccount {

    private String accountNumber;
    private int balance;
    private String customerName;
    private String email;
    private String phoneNumber;

    // 생성자 만들기
    public BankAccount() {
        // this를 이용해서 default 생성자 생성가능
        this("56789", 2500, "naruto", "qwe@gmail.com", "010-98-5462");
        System.out.println("Empty constructor called");
    }

    public BankAccount(String accountNumber, int balance, String customerName, String email, String phoneNumber) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.customerName = customerName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public BankAccount(String customerName, String email, String phoneNumber) {
        this("999999", 40000, customerName, email, phoneNumber);
    }

    // Additional
    public void depositFunds(int input) {
        this.balance += input;
        System.out.println(input + " is just added in your account. Total is " + this.balance);
}

    public void withdrawFunds(int output) {
       if(this.balance < output) {
           System.out.println("Not Sufficient Balance");
       } else {
           this.balance -= output;
           System.out.println("You just withdraw " + output + " in your account. Total is " + this.balance);
       }
    }

    // Getter
    public String getAccountNumber() {
        return this.accountNumber;
    }

    public int getBalance() {
        return this.balance;
    }

    public String getCustomerName() {
        return this.customerName;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

}
