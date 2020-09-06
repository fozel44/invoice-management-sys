package com.ms.invcms;

import com.ms.invcms.file.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class InvcmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvcmsApplication.class, args);
	}

}
