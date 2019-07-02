package com.company;

public class Dog extends Animal {

    // 상속뿐만 아니라 Dog 클래스만의 특별한 특징들도 생성 및 사용 가능하다
    private int eyes;
    private int legs;
    private int tail;
    private int teeth;
    private  String coat;

    public Dog(String name, int size, int weight, int eyes, int legs, int tail, int teeth, String coat) {
        // 부모로부터 상속받은 특징들을 사용하기 위해서 super를 이용해 생성자를 생성 및 초기화
        super(name, 1, 1, size, weight);
        // Dog 클래스만의 특징들 초기화
        this.eyes = eyes;
        this.legs = legs;
        this.tail = tail;
        this.teeth = teeth;
        this.coat = coat;
    }

    private void chew() {
        System.out.println("Dog chew() called");
    }

    @Override
    public void eat() {
        System.out.println("Dog.eat() called");
        chew();
        // 부모 클래스의 eat() 메소드
        super.eat();
    }

    public void walk() {
        System.out.println("Dog.walk() called");
        super.move(50);
    }

    public void run() {
        System.out.println("Dog.run() called");
        move(100);
    }

    private void moveLegs(int speed) {
        System.out.println("Dog moveLegs() called");
    }

    @Override
    public void move(int speed) {
        System.out.println(" Dog.java Dog.move() called");
        moveLegs(speed);
        super.move(speed);
    }
}
