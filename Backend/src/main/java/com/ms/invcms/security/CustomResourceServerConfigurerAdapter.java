package com.ms.invcms.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;


@Configuration
@EnableResourceServer
public class CustomResourceServerConfigurerAdapter extends ResourceServerConfigurerAdapter   {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.requestMatchers().antMatchers("/**").and()
                .authorizeRequests().antMatchers("/registration").permitAll().and()
                .authorizeRequests().antMatchers("/api/v1/**").authenticated().and();

        http.headers().frameOptions().disable();

    }
}
