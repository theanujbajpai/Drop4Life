package com.drop4life.api.config;

import com.drop4life.api.entity.*;
import com.drop4life.api.enums.*;
import com.drop4life.api.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final BloodInventoryRepository bloodInventoryRepository;
    private final BloodRequestRepository bloodRequestRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Already seeded
        }

        log.info("Seeding initial Drop4Life data...");

        String defaultPass = passwordEncoder.encode("Password@123");

        // 1. Admin user
        User admin = User.builder()
                .email("admin@drop4life.com")
                .fullName("Drop4Life Administrator")
                .passwordHash(defaultPass)
                .phone("9876543210")
                .dateOfBirth(LocalDate.of(1985, 1, 1))
                .gender("male")
                .bloodGroup(BloodGroup.O_NEGATIVE)
                .role(UserRole.ADMIN)
                .address("Healthcare HQ, Central Park")
                .city("New Delhi")
                .state("Delhi")
                .pincode("110001")
                .country("India")
                .isVerified(true)
                .isAvailable(false)
                .build();
        userRepository.save(admin);

        // 2. Verified Donors
        User donor1 = User.builder()
                .email("rahul.sharma@gmail.com")
                .fullName("Rahul Sharma")
                .passwordHash(defaultPass)
                .phone("9811223344")
                .dateOfBirth(LocalDate.of(1996, 5, 12))
                .gender("male")
                .bloodGroup(BloodGroup.B_POSITIVE)
                .role(UserRole.DONOR)
                .address("Sector 62, Indirapuram")
                .city("Noida")
                .state("Uttar Pradesh")
                .pincode("201301")
                .country("India")
                .latitude(28.6280)
                .longitude(77.3649)
                .weight(68.0)
                .lastDonationDate(LocalDate.now().minusMonths(4))
                .isVerified(true)
                .isAvailable(true)
                .build();

        User donor2 = User.builder()
                .email("priya.patel@gmail.com")
                .fullName("Priya Patel")
                .passwordHash(defaultPass)
                .phone("9822334455")
                .dateOfBirth(LocalDate.of(1998, 8, 20))
                .gender("female")
                .bloodGroup(BloodGroup.O_NEGATIVE)
                .role(UserRole.DONOR)
                .address("Koramangala 4th Block")
                .city("Bangalore")
                .state("Karnataka")
                .pincode("560034")
                .country("India")
                .latitude(12.9352)
                .longitude(77.6245)
                .weight(54.0)
                .lastDonationDate(LocalDate.now().minusMonths(6))
                .isVerified(true)
                .isAvailable(true)
                .build();

        User donor3 = User.builder()
                .email("amit.verma@gmail.com")
                .fullName("Amit Verma")
                .passwordHash(defaultPass)
                .phone("9833445566")
                .dateOfBirth(LocalDate.of(1992, 11, 4))
                .gender("male")
                .bloodGroup(BloodGroup.A_POSITIVE)
                .role(UserRole.DONOR)
                .address("Andheri West, Link Road")
                .city("Mumbai")
                .state("Maharashtra")
                .pincode("400053")
                .country("India")
                .latitude(19.1363)
                .longitude(72.8277)
                .weight(74.0)
                .lastDonationDate(LocalDate.now().minusMonths(5))
                .isVerified(true)
                .isAvailable(true)
                .build();

        userRepository.save(donor1);
        userRepository.save(donor2);
        userRepository.save(donor3);

        // 3. Requester
        User requester = User.builder()
                .email("sunita.gupta@gmail.com")
                .fullName("Sunita Gupta")
                .passwordHash(defaultPass)
                .phone("9844556677")
                .dateOfBirth(LocalDate.of(1990, 3, 15))
                .gender("female")
                .bloodGroup(BloodGroup.B_POSITIVE)
                .role(UserRole.REQUESTER)
                .address("Lajpat Nagar IV")
                .city("New Delhi")
                .state("Delhi")
                .pincode("110024")
                .country("India")
                .latitude(28.5677)
                .longitude(77.2433)
                .isVerified(true)
                .isAvailable(false)
                .build();
        userRepository.save(requester);

        // 4. Hospitals
        Hospital hospital1 = Hospital.builder()
                .name("Apollo Hospital")
                .address("Sarita Vihar, Delhi Mathura Road")
                .city("New Delhi")
                .state("Delhi")
                .pincode("110076")
                .phone("011-26925858")
                .email("info@apollohospitaldelhi.com")
                .website("https://www.apollohospitals.com")
                .licenseNumber("DL-HOSP-2021-9921")
                .bloodBankAvailable(true)
                .emergencyContact("1066")
                .latitude(28.5355)
                .longitude(77.2831)
                .isVerified(true)
                .build();

        Hospital hospital2 = Hospital.builder()
                .name("Manipal Hospital")
                .address("98, HAL Old Airport Rd, Kodihalli")
                .city("Bangalore")
                .state("Karnataka")
                .pincode("560017")
                .phone("080-25024444")
                .email("contact@manipalhospitals.com")
                .website("https://www.manipalhospitals.com")
                .licenseNumber("KA-HOSP-2022-4412")
                .bloodBankAvailable(true)
                .emergencyContact("080-25023333")
                .latitude(12.9592)
                .longitude(77.6529)
                .isVerified(true)
                .build();

        Hospital hospital3 = Hospital.builder()
                .name("Lilavati Hospital & Research Centre")
                .address("A-791, Bandra Reclamation, Bandra West")
                .city("Mumbai")
                .state("Maharashtra")
                .pincode("400050")
                .phone("022-26751000")
                .email("info@lilavatihospital.com")
                .website("https://www.lilavatihospital.com")
                .licenseNumber("MH-HOSP-2020-1188")
                .bloodBankAvailable(true)
                .emergencyContact("022-26568000")
                .latitude(19.0519)
                .longitude(72.8290)
                .isVerified(true)
                .build();

        hospitalRepository.save(hospital1);
        hospitalRepository.save(hospital2);
        hospitalRepository.save(hospital3);

        // Hospital Blood Bank Inventories
        for (Hospital h : new Hospital[]{hospital1, hospital2, hospital3}) {
            for (BloodGroup bg : BloodGroup.values()) {
                BloodInventory inventory = BloodInventory.builder()
                        .hospital(h)
                        .bloodGroup(bg)
                        .unitsAvailable((int) (Math.random() * 20) + 5)
                        .expiryDate(LocalDate.now().plusDays(35))
                        .lastUpdated(LocalDateTime.now())
                        .build();
                bloodInventoryRepository.save(inventory);
            }
        }

        // 5. Active Blood Requests
        BloodRequest req1 = BloodRequest.builder()
                .requester(requester)
                .patientName("Ramesh Kumar")
                .bloodGroup(BloodGroup.B_POSITIVE)
                .unitsNeeded(3)
                .urgencyLevel(UrgencyLevel.CRITICAL)
                .hospitalName("Apollo Hospital")
                .hospitalAddress("Sarita Vihar, Delhi Mathura Road, New Delhi")
                .hospitalPhone("011-26925858")
                .city("New Delhi")
                .pincode("110076")
                .requiredByDate(LocalDateTime.now().plusHours(8))
                .description("Emergency cardiac bypass surgery scheduled. Immediate blood required.")
                .contactNumber("9844556677")
                .reason("Open heart surgery requirement")
                .status(RequestStatus.ACTIVE)
                .latitude(28.5355)
                .longitude(77.2831)
                .donorsNotified(12)
                .donorsResponded(3)
                .unitsSecured(1)
                .build();

        BloodRequest req2 = BloodRequest.builder()
                .requester(requester)
                .patientName("Sneha Roy")
                .bloodGroup(BloodGroup.O_NEGATIVE)
                .unitsNeeded(2)
                .urgencyLevel(UrgencyLevel.URGENT)
                .hospitalName("Manipal Hospital")
                .hospitalAddress("98, HAL Old Airport Rd, Kodihalli, Bangalore")
                .hospitalPhone("080-25024444")
                .city("Bangalore")
                .pincode("560017")
                .requiredByDate(LocalDateTime.now().plusDays(1))
                .description("Trauma unit emergency patient. Universal donor units needed urgently.")
                .contactNumber("9844556677")
                .reason("Road accident trauma recovery")
                .status(RequestStatus.ACTIVE)
                .latitude(12.9592)
                .longitude(77.6529)
                .donorsNotified(8)
                .donorsResponded(2)
                .unitsSecured(0)
                .build();

        bloodRequestRepository.save(req1);
        bloodRequestRepository.save(req2);

        log.info("Drop4Life seed data initialized successfully!");
    }
}
