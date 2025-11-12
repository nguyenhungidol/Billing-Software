# Phần mềm Quản lý Thanh toán (Billing Software)

## 📖 Giới thiệu


## ✨ Tính năng chính

* **📊 Bảng điều khiển (Dashboard):** Tổng quan về doanh thu, hóa đơn sắp hết hạn, và các hoạt động gần đây.
* **👥 Quản lý Khách hàng:** Thêm, sửa, xóa và tìm kiếm thông tin khách hàng.
* **📦 Quản lý Sản phẩm/Dịch vụ:** Định nghĩa các sản phẩm hoặc dịch vụ với mức giá cố định.
* **🧾 Quản lý Hóa đơn:**
    * Tạo hóa đơn chi tiết (invoice).
    * Tự động tính thuế (VAT) và giảm giá.
    * Thanh toán Momo
    * Xuất hóa đơn ra file PDF.
* **💳 Theo dõi Thanh toán:** Ghi nhận các khoản thanh toán (toàn bộ hoặc một phần) và cập nhật trạng thái hóa đơn (Đã thanh toán, Chưa thanh toán).
* **🔐 Xác thực & Phân quyền:** Đăng nhập an toàn và phân quyền người dùng 

---

## 🛠️ Công nghệ sử dụng

Mô tả các công nghệ, framework, và cơ sở dữ liệu đã được sử dụng để xây dựng dự án này.

**Backend:**
* [Ngôn ngữ: Java 21 ]
* [Framework: Spring Boot ]
* [Cơ sở dữ liệu:  MySQL ]
* [ORM: Spring Data JPA]
* [Xác thực: Spring Security / JWT]

**Frontend:**
* [Framework: React ]
* [Ngôn ngữ: JavaScript]
* [Thư viện UI: Bootstrap ]
* [Quản lý state:  Context API]

**Khác (DevOps/Testing/Dịch vụ):**
* [ Postman, JUnit/Jest, AWS S3 ]

---

## 🚀 Cài đặt và Chạy dự án

Hướng dẫn chi tiết để một lập trình viên khác có thể thiết lập dự án này trên máy cục bộ của họ.

### Yêu cầu
* [Phiên bản ngôn ngữ: JDK 21+]
* [Phiên bản Node.js: Node.js v20+]
* [Cơ sở dữ liệu: MySQL v14]
* [Công cụ build, ví dụ: Maven]

### Hướng dẫn cài đặt

1.  **Clone repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[ten-nguoi-dung-cua-ban]/[ten-repository-cua-ban].git
    cd [ten-repository-cua-ban]
    ```

2.  **Cài đặt Backend (`[thu-muc-backend]`):**
    ```bash
    cd [thu-muc-backend]
    
    # Cài đặt dependency (ví dụ cho Maven)
    ./mvnw install
    
    # Cấu hình file application.properties (xem mục Cấu hình)
    
    # Chạy ứng dụng (ví dụ cho Spring Boot)
    ./mvnw spring-boot:run
    ```

3.  **Cài đặt Frontend (`[thu-muc-frontend]`):**
    ```bash
    cd [thu-muc-frontend]
    
    # Cài đặt dependency
    npm install
    
    # Cấu hình file .env (xem mục Cấu hình)
    
    # Chạy ứng dụng
    npm start
    ```
    
4.  **Truy cập ứng dụng:**
    * Frontend chạy tại: `http://localhost:3000`
    * Backend API (docs) chạy tại: `http://localhost:8080/swagger-ui.html`

---

## ⚙️ Cấu hình

Dự án yêu cầu một số biến môi trường để hoạt động. Vui lòng tạo file `.env` (cho frontend) hoặc `application.properties` (cho backend) dựa trên các file `.example` và điền các giá trị:

**Backend (ví dụ: `application.properties`):**
```properties
# Cấu hình Database
spring.datasource.url=jdbc:postgresql://localhost:5432/[ten-db]
spring.datasource.username=[username-db]
spring.datasource.password=[password-db]

# Cấu hình JWT
jwt.secret=[mot-key-bi-mat-rat-dai]

# Cấu hình dịch vụ (ví dụ: AWS S3 để lưu hóa đơn)
aws.s3.access-key=YOUR_ACCESS_KEY
aws.s3.secret-key=YOUR_SECRET_KEY
aws.s3.bucket-name=your-billing-bucket

Cải tiến thêm:
- Giỏ hàng khi load lại trang bị mất
- Thêm phần chỉnh sửa cho các manage
- Đăng kí tài khoản - backend
- Setting, Activity logs chưa xây dựng
- Order history cho người dùng 
- user info login
- Fetchapi items loop
- Load page in role admin redirect to page of role user
- Chuyển đổi AWS thành lưu trữ local


https://www.youtube.com/watch?v=_UNE39gZrV4 - tham khảo
