package hello;

import org.joda.time.LocalTime;

public class HelloWorld {
    public static void main(String[] args) {
        LocalTime currentTime = new LocalTime();
        System.out.println("The current local time is :" + currentTime);
        Greetor greetor = new Greetor();
        System.out.print(greetor.sayHi());
    }
}