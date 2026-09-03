package com.drop4life.api.util;

public class DistanceCalculator {

    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Calculates distance between two coordinates in kilometers using the Haversine formula.
     */
    public static double calculateDistanceKm(Double lat1, Double lon1, Double lat2, Double lon2) {
        if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
            return 9999.0; // Default large distance if unknown
        }

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round((EARTH_RADIUS_KM * c) * 10.0) / 10.0;
    }

    /**
     * Priority tier based on distance in km
     * Tier 1: 0 - 5 km
     * Tier 2: 5 - 15 km
     * Tier 3: 15 - 30 km
     * Tier 4: 30+ km
     */
    public static int getDistanceTier(double distanceKm) {
        if (distanceKm <= 5.0) return 1;
        if (distanceKm <= 15.0) return 2;
        if (distanceKm <= 30.0) return 3;
        return 4;
    }
}
