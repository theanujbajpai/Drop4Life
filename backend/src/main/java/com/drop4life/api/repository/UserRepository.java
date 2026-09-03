package com.drop4life.api.repository;

import com.drop4life.api.entity.User;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(UserRole role);

    List<User> findByRoleAndIsAvailableTrue(UserRole role);

    List<User> findByRoleAndBloodGroup(UserRole role, BloodGroup bloodGroup);

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isAvailable = true AND u.bloodGroup IN :compatibleGroups")
    List<User> findAvailableDonorsByBloodGroups(
            @Param("role") UserRole role,
            @Param("compatibleGroups") List<BloodGroup> compatibleGroups
    );

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isAvailable = true AND u.bloodGroup IN :compatibleGroups AND u.city = :city")
    List<User> findAvailableDonorsByBloodGroupsAndCity(
            @Param("role") UserRole role,
            @Param("compatibleGroups") List<BloodGroup> compatibleGroups,
            @Param("city") String city
    );

    long countByRole(UserRole role);

    long countByRoleAndIsAvailableTrue(UserRole role);
}
