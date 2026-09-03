package com.drop4life.api.util;

import com.drop4life.api.enums.BloodGroup;

import java.util.*;

public class BloodCompatibilityUtil {

    // Key: Recipient Blood Group, Value: List of Donor Blood Groups that can donate to this recipient
    private static final Map<BloodGroup, List<BloodGroup>> COMPATIBLE_DONORS_FOR_RECIPIENT = new EnumMap<>(BloodGroup.class);

    // Key: Donor Blood Group, Value: List of Recipient Blood Groups this donor can give to
    private static final Map<BloodGroup, List<BloodGroup>> COMPATIBLE_RECIPIENTS_FOR_DONOR = new EnumMap<>(BloodGroup.class);

    static {
        // Recipient perspective: who can donate to them?
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.O_NEGATIVE, List.of(BloodGroup.O_NEGATIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.O_POSITIVE, List.of(BloodGroup.O_NEGATIVE, BloodGroup.O_POSITIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.A_NEGATIVE, List.of(BloodGroup.O_NEGATIVE, BloodGroup.A_NEGATIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.A_POSITIVE, List.of(BloodGroup.O_NEGATIVE, BloodGroup.O_POSITIVE, BloodGroup.A_NEGATIVE, BloodGroup.A_POSITIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.B_NEGATIVE, List.of(BloodGroup.O_NEGATIVE, BloodGroup.B_NEGATIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.B_POSITIVE, List.of(BloodGroup.O_NEGATIVE, BloodGroup.O_POSITIVE, BloodGroup.B_NEGATIVE, BloodGroup.B_POSITIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.AB_NEGATIVE, List.of(BloodGroup.O_NEGATIVE, BloodGroup.A_NEGATIVE, BloodGroup.B_NEGATIVE, BloodGroup.AB_NEGATIVE));
        COMPATIBLE_DONORS_FOR_RECIPIENT.put(BloodGroup.AB_POSITIVE, Arrays.asList(BloodGroup.values()));

        // Populate reverse map (Donor perspective: who can they donate to?)
        for (BloodGroup donor : BloodGroup.values()) {
            List<BloodGroup> recipients = new ArrayList<>();
            for (Map.Entry<BloodGroup, List<BloodGroup>> entry : COMPATIBLE_DONORS_FOR_RECIPIENT.entrySet()) {
                if (entry.getValue().contains(donor)) {
                    recipients.add(entry.getKey());
                }
            }
            COMPATIBLE_RECIPIENTS_FOR_DONOR.put(donor, Collections.unmodifiableList(recipients));
        }
    }

    public static List<BloodGroup> getCompatibleDonorsForRecipient(BloodGroup recipientGroup) {
        return COMPATIBLE_DONORS_FOR_RECIPIENT.getOrDefault(recipientGroup, List.of(recipientGroup));
    }

    public static List<BloodGroup> getCompatibleRecipientsForDonor(BloodGroup donorGroup) {
        return COMPATIBLE_RECIPIENTS_FOR_DONOR.getOrDefault(donorGroup, List.of(donorGroup));
    }

    public static boolean isCompatible(BloodGroup donorGroup, BloodGroup recipientGroup) {
        List<BloodGroup> allowedDonors = COMPATIBLE_DONORS_FOR_RECIPIENT.get(recipientGroup);
        return allowedDonors != null && allowedDonors.contains(donorGroup);
    }
}
