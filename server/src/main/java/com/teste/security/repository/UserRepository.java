package com.teste.security.repository;

import com.teste.security.domain.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByUsername(String username);

  @Transactional
  default User findOneThrow(String username) {
    return findByUsername(username).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado!"));
  }

}
