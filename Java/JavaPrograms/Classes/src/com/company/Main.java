package com.company;

public class Main {

    public static void main(String[] args) {
//       BankAccount customer= new BankAccount("123-234-345345", 100000, "Jay", "sdkf@google.com", "010-1031-1234" );
////
////       System.out.println(
////                "Customer's name " + customer.getCustomerName() + " " +
////                        "Customer's phone number " + customer.getPhoneNumber() + " " +
////                        "Customer's email " + customer.getEmail() + " " +
////                        "Customer's account number " + customer.getAccountNumber() + " " +
////                        "Customer's account balance is " + customer.getBalance()
////                );
////       customer.depositFunds(3000);
////       customer.withdrawFunds(63);
////
////       BankAccount timsAccount = new BankAccount("Tim", "time@email.com", "12345");
////        System.out.println(timsAccount.getAccountNumber());

        VipCustomer jay = new VipCustomer("wogu@gmail.com");
        VipCustomer tim = new VipCustomer();

        System.out.println(
                jay.getName() + " " + jay.getEmail() + " " + jay.getCreditLimit() + " " +
                tim.getName() + " " + tim.getEmail() + " " + tim.getCreditLimit()
        );
    }
}
