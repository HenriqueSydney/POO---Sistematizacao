package br.com.henriquelima.dianome.utils;

import java.util.Random;

import lombok.Data;

@Data
public class RandomPackageCodeGenerator {

    private String packageCode;

    public RandomPackageCodeGenerator() {
        String randomChars = generateRandomChars();        
        int randomNumber = generateRandomNumber(10000000, 99999999);
        
        // Combine os caracteres e o número aleatório
        String randomPackageCode = randomChars + randomNumber;
        
        this.packageCode = randomPackageCode;
    }
   
    public static String generateRandomChars() {
        Random random = new Random();
        char char1 = (char) (random.nextInt(26) + 'A');
        char char2;
        do {
            char2 = (char) (random.nextInt(26) + 'A');
        } while (char2 == char1);
        
        return String.valueOf(char1) + String.valueOf(char2);
    }

    
    public static int generateRandomNumber(int min, int max) {
        Random random = new Random();
        return random.nextInt((max - min) + 1) + min;
    }    
}
