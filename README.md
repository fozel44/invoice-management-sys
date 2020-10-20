# Invoice Management System

 Bu uygulama bir web arayüzü aracılığıyla uygulamayı kullanan yönetici ve çalışanların aylık faturalandırma işlemlerinin takibi amacıyla yapılmış projenin public beta versiyonudur.
 Uygulamayı kullanan yönetici, hesabına giriş yaptıktan sonra sisteme yeni çalışanlar veya farklı röllerde ve yetkilerde kullanıcılar kaydedebilir.
 Çalışanlar ise her ay dönümlerinde sisteme kestikleri faturanın dökümanını ve detaylarını upload eder.
 Yönetici bu ayda, o çalışan için kiralanan firmaya fatura keser ve aynı şekilde sisteme girer.
 Sistem faturaların yanı sıra zaman çizelgelerini de barındırır ve SLA almaya olanak sağlar.
 
## Başlarken

Uygulamayı kendi local bilgisayarınızda çalıştırmak için izlemeniz gereken yol aşağıda belirtilmiştir.
### Ön Koşullar

What things you need to install the software and how to install them

```
Java 11
Angular 10+
npm 6+
OpenJDK 14+
```

### Kurulum

Kurulumun tamamlanması ve çalışan ortamın bilgisayarınızda ayağa kaldırılması için ön koşulları sağladığınızdan emin olun.
Kurulum için gereken adımar aşağıda sıralanmıştır.

Proje dosyalarıni git clone ile aldıktan sonra terminalde frontend klasörünün içerisinde aşağıdaki komutu çalıştırın.

```
npm install
```

Ardından aşağıdaki komut ile arayüzü ayağa kaldırın.

```
ng serve --open
```

Bu aşamada projenin frontendi çalışır hale geldikten sonra backend klasöründe aşağıdaki komutu çalıştırın
 
```
mvn clean install
```

Ardından backend kaynak kodlarının içerisinde oluşan target klasöründen jar dosyanızın ismini ve yolunu alın.

Terminal üzerinde ilgili dizinde aşağıdaki komutu çalıştırın.

```
javac -jar dosyaadı.jar
```

Varsayılan olarak localhost://8080 portunda backend
localhost:4200 portunda da frontend çalışır hale gelmiş olmalıdır.
localhost:4200 portuna tarayıcınızdan erişerek uygulamayı kullanabilirsiniz.
Varsayılan yönetici kullanıcı adı = test@test.com
							  şifre= test


## Built With

* [Maven](https://maven.apache.org/) - Dependency Management


