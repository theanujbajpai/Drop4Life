package com.drop4life.api.util;

public final class ValidationConstants {
    private ValidationConstants() {}

    public static final String PHONE_REGEX = "^[6-9]\\d{9}$";
    public static final String PINCODE_REGEX = "^\\d{6}$";
    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$";

    public static final int MIN_DONOR_AGE = 18;
    public static final int MAX_DONOR_AGE = 65;
    public static final double MIN_DONOR_WEIGHT_KG = 45.0;

    public static final int MALE_DONATION_COOLDOWN_DAYS = 90;
    public static final int FEMALE_DONATION_COOLDOWN_DAYS = 120;
}
