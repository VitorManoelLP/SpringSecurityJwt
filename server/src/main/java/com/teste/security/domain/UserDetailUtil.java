package com.teste.security.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class UserDetailUtil {

  @Autowired
  private UserDetailsService userDetailsService;

  public UserDetails findByUsername(String username) {
    return userDetailsService.loadUserByUsername(username);
  }

}
