package com.drop4life.api.enums;

public enum BloodGroup {
    A_POSITIVE("A+"),
    A_NEGATIVE("A-"),
    B_POSITIVE("B+"),
    B_NEGATIVE("B-"),
    AB_POSITIVE("AB+"),
    AB_NEGATIVE("AB-"),
    O_POSITIVE("O+"),
    O_NEGATIVE("O-");

    private final String displayName;

    BloodGroup(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static BloodGroup fromDisplayName(String name) {
        for (BloodGroup bg : values()) {
            if (bg.displayName.equals(name)) {
                return bg;
            }
        }
        throw new IllegalArgumentException("Invalid blood group: " + name);
    }
}
