
// Raspberry Pi Lambda LEDs.
// By: PuZZleDucK
// Prerequisites:
//      -Java8.
//      -Pi4J.
//      -A Raspberry Pi to run it on.
//
package org.puzzleduck.rpi;

import com.pi4j.io.gpio.*;
import java.util.*;

public class LedTestWave{ //pin mappings.
  private static Pin piPin03 = RaspiPin.GPIO_08;
  private static Pin piPin05 = RaspiPin.GPIO_09;
  private static Pin piPin07 = RaspiPin.GPIO_07;
  private static Pin piPin08 = RaspiPin.GPIO_15;
  private static Pin piPin10 = RaspiPin.GPIO_16;
  private static Pin piPin11 = RaspiPin.GPIO_00;
  private static Pin piPin12 = RaspiPin.GPIO_01;
  private static Pin piPin13 = RaspiPin.GPIO_02;
  private static Pin piPin15 = RaspiPin.GPIO_03;
  private static Pin piPin16 = RaspiPin.GPIO_04;
  private static Pin piPin18 = RaspiPin.GPIO_05;
  private static Pin piPin19 = RaspiPin.GPIO_12;
  private static Pin piPin21 = RaspiPin.GPIO_13;
  private static Pin piPin22 = RaspiPin.GPIO_06;
  private static Pin piPin23 = RaspiPin.GPIO_14;
  private static Pin piPin24 = RaspiPin.GPIO_10;
  private static Pin piPin26 = RaspiPin.GPIO_11;
  private static ArrayList<Pin> allPins = new ArrayList<Pin>();
  
  public static void main(String args[]) throws Exception{
    allPins.add(piPin03);
    allPins.add(piPin05);
    allPins.add(piPin07);
    allPins.add(piPin08);
    allPins.add(piPin10);
    allPins.add(piPin11);
    allPins.add(piPin12);
    allPins.add(piPin13);
    allPins.add(piPin15);
    allPins.add(piPin16);
    allPins.add(piPin18);
    allPins.add(piPin19);
    allPins.add(piPin21);
    allPins.add(piPin22);
    allPins.add(piPin23);
    allPins.add(piPin24);
    allPins.add(piPin26);

    System.out.println(" :: LedWave :: ");
    GpioController gpio = GpioFactory.getInstance();

    ArrayList<GpioPinDigitalOutput> gpioPins = new ArrayList<GpioPinDigitalOutput>();
    for(Pin p : allPins) {
      gpioPins.add(gpio.provisionDigitalOutputPin(p, "auto", PinState.LOW));
    }

    Thread.sleep(2000); // suspense...


while(true) {  //LOOP
    gpioPins.stream().forEach(p -> {p.pulse(270,false); try{ Thread.sleep(55); } catch(Exception e){} });

    Thread.sleep(210);
    System.out.print("#");

    for(int x = gpioPins.size()-1; x >= 0; x--) {
      if(gpioPins != null) {
        GpioPinDigitalOutput p = gpioPins.get(x);
        p.pulse(270, false);
        Thread.sleep(55);
      }
    }
    
//    Collections.sort(gpioPins, String::equals).stream().forEach(p -> {p.pulse(270,false); try{ Thread.sleep(55); } catch(Exception e){} });
    Collections.sort(gpioPins, (p, q) -> p.toString().equals(q.toString())  ).stream().forEach(p -> {p.pulse(270,false); try{ Thread.sleep(55); } catch(Exception e){} });
    Thread.sleep(210);
    System.out.print("_");
} // END LOOP

//never get here, using ctrl-c for exit... naughty
//    gpio.shutdown();
//    System.out.println("Done.");
  }
}

