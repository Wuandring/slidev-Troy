# Trojan Horse: chỉ dẫn animation cho Slidev

Nguồn: Trojan Horse.pptx, 21 slide theo thứ tự thực tế. Tài liệu này thay thế toàn bộ phần gợi ý hoạt ảnh cũ. Đây là thiết kế để triển khai, chưa phải animation đã chạy. Nội dung trên slide nguồn vẫn giữ nguyên trong bản PPTX cập nhật note.

## Quy ước chung cho agent

- Phong cách: phim giải thích 2D với nét vẽ đơn giản, ngựa gỗ màu nâu và người gác trong deck làm nhân vật xuyên suốt. Ưu tiên kể được quan hệ nguyên nhân và kết quả. Không phủ hiệu ứng lên mọi chữ.
- Tài sản đã có: ngựa trong media image13.svg / image17.svg, bản PNG image12.png / image16.png; người gác image15.svg / image19.svg, bản PNG image14.png / image18.png. Kiểm tra cấu trúc SVG trước khi tách lớp. Các hình cổng ở slide 1, 2, 6, 21 hiện có vùng ghi [ẢNH GỢI Ý], không được coi chúng là tranh thành Troy hoàn chỉnh. Khi dựng Slidev, hoàn thiện cảnh cùng phong cách nhân vật hiện có. Không hiện chữ placeholder ra màn hình.
- Rig ngựa gỗ: thân, bánh xe, nắp hông, người bên trong là các lớp riêng. Ngựa gỗ di chuyển bằng bánh xe, chân không bước, đầu không gật như ngựa sống. Bánh quay đúng chiều dịch chuyển. Chỉ ngựa thật có nhịp bước và thở rất nhẹ.
- Rig lính gác: thân, đầu, cánh tay cầm giáo, mắt nếu nguồn cho phép. Xoay quanh khớp, không kéo méo cả hình. Khi thiếu lớp, dùng dịch chuyển cả nhân vật và đổi tư thế, không hứa hẹn chuyển động bộ phận từ ảnh phẳng.
- Tọa độ chuyển động lấy theo khung 1600 × 900, co theo tỉ lệ. Văn bản, code và hình giữ kích thước ổn định giữa các bước. Có thể chia vùng diễn hoạt trong cùng một slide, giữ 21 slide chính.
- B0 là lúc vào slide. B1, B2... là số lần bấm tiếp theo. Chỉ tự chạy chuỗi ngắn trong một bước. Đợi người thuyết trình bấm để sang ý tiếp theo. Thời gian dừng đọc là gợi ý cho người nói, không đặt bộ hẹn giờ tự chuyển slide.
- Reveal chữ: opacity 0→1 và dịch lên 8–12 px, 250–350 ms. Chuyển trọng tâm 400–600 ms. Di chuyển nhân vật 700–1200 ms. Cảnh cao trào tối đa khoảng 2,5 giây mỗi nhịp. Dùng easing giảm tốc mềm, không nảy chữ, không typewriter từng ký tự code.
- Một nhịp chỉ có một vùng chính chuyển động. Lớp phụ vẫn đủ tương phản để đọc. Chỉ dùng loop nền khi có ý nghĩa, dừng khi trình bày code. Không nhấp nháy, không rung toàn màn hình, không âm thanh tự phát.
- Xanh = test pass, đỏ = test fail, hổ phách = câu hỏi/cảnh báo. Luôn kèm chữ hoặc biểu tượng. PASS không đồng nghĩa an toàn. Trong cảnh Troy thất thủ, CI vẫn xanh.
- Thanh manh mối chỉ có 4 ô. Slide 6: 0/4. Slide 8: 1/4. Slide 12: 2/4. Slide 15: 3/4. Slide 18: 4/4. Slide 20 nhấn lại từng ô, không sinh ô thứ 5. Trước slide 6 không cần thanh này.
- Mỗi bước phải có trạng thái xác định. Bấm lùi phục hồi đúng cảnh trước, vào lại slide khởi tạo đúng bước. Hủy animation/timer khi rời slide. Bấm nhanh không nhân đôi nhân vật hay bỏ mất lời kết. Không phụ thuộc kết thúc animation để tính logic.
- Bản giảm chuyển động: thay đường bay, quay, zoom bằng chuyển trạng thái tức thời hoặc fade 100 ms. Bản PDF hiện đủ nội dung cuối, không có vật thể bị cắt giữa đường đi.
- Dùng thành phần cảnh tái sử dụng cho ngựa, người gác, cổng, CI, thanh manh mối. Dùng state theo bước cho kết quả, lớp SVG cho bộ phận và CSS transforms cho chuyển động. Agent đối chiếu API với phiên bản Slidev trong dự án trước khi chọn cú pháp. Không cần thêm thư viện animation nếu CSS và state đủ dùng.

## Slide 01 | Con ngựa thành Troy

Mục tiêu: mở câu chuyện và gieo mâu thuẫn giữa dấu xanh với cảm giác bất an.

B0: nền hiện trước. Cảnh cổng dạng nét vẽ đồng bộ với ngựa, các lớp xa/gần dịch rất nhẹ rồi dừng trong 900 ms. Chừa vùng yên tĩnh cho tiêu đề.
B1: tiêu đề “Con ngựa thành Troy” hiện 450 ms, rồi dòng “MỘT CÂU CHUYỆN VỀ KIỂM THỬ” và phụ đề hiện 250 ms. Giữ nguyên nội dung phụ đề tiếng Anh.
B2: CI · main hiện một dấu xanh 300 ms. Bóng ngựa nhỏ chỉ ló ở rìa đường, chưa mở nắp và chưa lộ lính. Tạo câu hỏi bằng hình, không báo trước đáp án.
Điểm dừng: 2 giây sau phụ đề. Kết cảnh tĩnh để chào khán giả.
Chuyển trang: giữ vị trí đường chân trời và cổng làm mốc cho slide 2, crossfade 450 ms nếu không thể chuyển liên tục.

## Slide 02 | Mười năm vây hãm

Mục tiêu: cảm nhận thời gian dài và tâm lý mệt mỏi.

B0: cổng cùng vị trí tương đối slide 1. Doanh trại ở xa, người gác đứng trước cổng, không thêm thông tin lịch sử ngoài slide.
B1: hiện tiêu đề và dòng mốc thời gian. Ánh sáng chuyển qua ba trạng thái ngày/đêm chậm trong 1500 ms, sau đó dừng. Con số “Mười năm” được nhấn một lần, không tạo bộ đếm lịch sử chính xác giả.
B2: người gác hạ vai 6 px, đầu nghiêng 5°, rồi ô thoại xuất hiện sau 200 ms. Nếu không tách được đầu, đổi giữa hai tư thế toàn thân.
B3: hiện câu kết cuối slide. Nhấn cụm “nâng cấp phòng thủ” bằng gạch sáng 350 ms.
Điểm dừng: đọc ô thoại rồi chuyển sang lý do xây hệ thống. Không chạy loop ngày đêm trong lúc đọc.

## Slide 03 | Người gác cổng mới

Mục tiêu: cho thấy yêu cầu “ngựa thật” đang bị thay bằng năm dấu hiệu hình dáng.

B0: hiện tiêu đề, người gác và cổng đóng. Chưa hiện kết luận.
B1: hiện yêu cầu. “thật” nhận nền hổ phách trong 600 ms rồi giữ gạch chân. Dừng 1 giây.
B2: khối code hiện nguyên khối, giữ bố cục. Tô dòng analyze rồi danh sách features, mỗi lần 400 ms. Không giả vờ đang chạy Python.
B3: một ngựa thật làm ví dụ đứng trong vùng quét. Một dải sáng quét 900 ms. Lần lượt nối nhãn tới bốn chân, thân, chiều cao, bờm, móng; mỗi nhãn cách nhau 180 ms. Đủ năm dấu kiểm thì tô dòng all(...).
B4: hiện “Đủ năm đặc trưng → là ngựa” và ô thoại. Người gác nhấc giáo, cổng chỉ mở cho ngựa ví dụ rồi đóng. Chữ “thật” vẫn được giữ làm dấu mốc thị giác.
Chốt lời: đây là điều kiện code đang dùng, chưa phải bằng chứng đáp ứng toàn bộ ý định. Chưa đưa ngựa gỗ vào.

## Slide 04 | Kiểm thử

Mục tiêu: khiến người xem tin bộ test trước khi đặt lại câu hỏi.

B0: tiêu đề, CI · pytest và chỗ trống cố định cho sáu dòng test. Không hiện badge tổng kết.
B1: ba test ngựa đen, trắng, nâu sáng lần lượt, cách 400 ms. Thumbnail ngựa tương ứng đi ngang ô quét. Dấu tick gắn với từng assertion.
B2: hiện hai test hổ, chó. Cổng đóng với hai con vật, nhưng assertion nhận tick xanh vì kết quả False là đúng kỳ vọng. Không dùng chữ FAIL cho tình huống bị chặn đúng.
B3: hiện dòng test flip. Trong ô ảnh riêng, ngựa lật ngang 500 ms, code giữ nguyên chiều. Hai kết quả bằng nhau nối lại bằng dấu bằng và tick xanh.
B4: hiện “6/6 passed · coverage 100%” 350 ms. Người gác thả lỏng rồi ô thoại xuất hiện. Dừng 2 giây trên màn hình xanh.
Lưu ý: đây là bộ test minh họa của deck. Không dựng terminal/log chạy thật khi chưa có kết quả thực nghiệm. Không tự đổi thành 7 test.

## Slide 05 | Những ngày yên bình

Mục tiêu: tạo sự tự tin quá mức và đưa Cassandra vào cảnh.

B0: dashboard CI hiện, các ô passed lần lượt sáng theo hàng trong 800 ms rồi đứng yên. Không để bảng nhấp nháy liên tục.
B1: một ngựa thật đi qua cổng trong 1000 ms. Người gác quay đầu theo ngựa rồi trở lại nhìn dashboard. Chỉ một lượt đi, không thêm test mới.
B2: Cassandra tiến vào 30 px, giơ tay và hiện câu cảnh báo. Dashboard vẫn xanh. Dừng một nhịp.
B3: người gác xoay về phía dashboard và hiện lời đáp “Lại Cassandra nữa à? Dashboard vẫn xanh mà!”. Lời Cassandra vẫn đọc được, không xóa lời cảnh báo.
B4: hiện chú thích truyền thuyết và câu “Dashboard vẫn xanh mà.” cuối slide. Hạ chuyển động về trạng thái tĩnh.
Tài sản bổ sung: Cassandra nếu chưa có trong slide là nhân vật cùng nét vẽ, cần tạo riêng khi chuyển đổi. Không dùng người gác làm Cassandra bằng cách chỉ đổi tên.

## Slide 06 | Cho đến một buổi sáng...

Mục tiêu: cao trào đầu tiên, kết quả xanh dẫn tới quyết định sai.

B0: cổng đóng, doanh trại xa vắng, ánh sáng bình minh. Hiện tiêu đề trước, các dòng kết luận tạm ẩn.
B1: ngựa gỗ lăn từ trái tới trước cổng khoảng 250 px trong 1200 ms. Bánh quay, thân chỉ nhún tối đa 2 px. Hiện đoạn kể “Quân Hy Lạp dường như đã rút...”.
B2: dải quét lướt qua ngựa 800 ms. Năm dấu hiệu từ slide 3 sáng tuần tự quanh hình, rồi hiện is_horse(wooden_horse) → True. CI giữ xanh. Dừng 1 giây.
B3: người gác nâng giáo, hai cánh cổng mở quanh bản lề 700 ms, ngựa lăn qua ngưỡng 900 ms. Đánh dấu rõ khoảnh khắc vật được cho vào. Ngựa đi sau lớp tường nhờ che lớp, không trượt xuyên tường.
B4: trời tối trong 500 ms. Nắp hông ngựa mở 400 ms, 2–3 lính nhỏ bước ra lần lượt và tiến về cơ cấu mở cổng trong 1000 ms. Cổng mở rộng, bóng lính ngoài thành tràn vào. Chỉ dùng bóng/ánh đỏ xa để gợi thất thủ, không hiệu ứng nổ che nội dung. CI vẫn xanh.
B5: giữ cảnh 2 giây theo người nói, rồi hiện câu hỏi “Không test nào fail...” trên vùng trống. Các nhân vật dừng hẳn.
B6: hiện “có 4 manh mối” cùng 4 ô chưa sáng. Kết ở 0/4.
Lưu ý lời kể: giữ “theo truyền thuyết”. Đây là hình minh họa cho câu chuyện, không tái dựng lịch sử chính xác.

## Slide 07 | Ba tầng test, ba mô hình tư duy

Mục tiêu: cho thấy phạm vi tăng dần, tránh đổ cả bảng lên màn hình cùng lúc.

B0: hiện tiêu đề và hàng tên cột, các hàng giữ sẵn không gian.
B1: hàng Unit hiện cùng cảnh thu nhỏ chỉ người gác trong vòng khoanh. Tô vùng một hàm, hiện ưu và nhược cùng hàng.
B2: hàng Integration hiện. Mở vùng khoanh thêm tuần tra và báo động, vẽ đường liên kết 500 ms. Giữ hàng Unit đọc được.
B3: hàng E2E hiện. Khung nhìn mở ra toàn cổng và đường đi của khách trong 600 ms, làm rõ luồng qua nhiều thành phần.
B4: hiện dòng static analysis ở nền và ba mô hình Pyramid, Trophy, Honeycomb lần lượt 180 ms. Giữ tên và mô tả hiện có. Không vẽ kích thước như số liệu đo lường.
B5: hiện “Chỉ là heuristic, không phải quy chuẩn.” Nhấn cả ba mô hình ngang nhau, không gắn tick thắng/thua.
Chốt: không thêm Ice Cream Cone vào animation vì slide hiện tại không có nội dung đó. Thanh manh mối giữ 0/4.

## Slide 08 | Code do AI sinh: đầu tư vào đâu?

Mục tiêu: đưa ra quan điểm, mời khán giả chọn trước khi lộ manh mối.

B0: tiêu đề và nhãn “Giả thuyết / quan điểm” hiện cùng nhau, nhãn luôn nhìn thấy.
B1: hiện ý AI sinh hàng loạt unit test. Một chồng giấy test tăng bằng 3 lớp trong 600 ms, không đếm số không có nguồn. Phần chân pyramid sáng nhưng không gắn kết luận định lượng.
B2: hiện ý lỗi yêu cầu/ghép nối và ưu tiên integration/contract. Trọng tâm chuyển sang đường nối các thành phần 500 ms. Nhấn ý E2E “red team” ở nhịp cuối, không thể hiện mọi E2E đều là kiểm thử tấn công.
B3: hiện câu hỏi và dấu ?. Dừng chờ khán giả 5–8 giây hoặc lâu hơn. Không chạy animation để ép câu trả lời.
B4: hiện câu Laocoön, nhân vật quay về phía ngựa ngoài cổng nếu có tài sản phù hợp. Đây là tiếng nói cảnh báo trong câu chuyện.
B5: hiện toàn bộ Manh mối 1, sáng ô 1/4. Khoanh lại biểu tượng một hàm để nhắc cả sáu test chỉ kiểm tra is_horse.
Chốt lời: đây là lập luận của bài nói, không phải kết quả đo chất lượng mọi code AI.

## Slide 09 | Oracle: cái “True” này từ đâu ra?

Mục tiêu: tách nguồn actual và expected bằng chuyển động có ý nghĩa.

B0: tiêu đề và định nghĩa oracle, dừng một nhịp.
B1: hiện assert, is_horse(image), ==. Chừa chỗ của expected cố định. Nhãn “Kết quả từ code” xuất hiện; một điểm sáng đi từ hình đầu vào tới lời gọi hàm trong 600 ms.
B2: expected và “Đáp án từ oracle” xuất hiện từ một vùng nguồn riêng bên phải 450 ms. expected nhấn scale 1→1,04→1 một lần, 400 ms. Tuyệt đối không sao chép giá trị từ nhánh actual sang expected ở slide này.
B3: ngựa gỗ lăn nhẹ vào vị trí sẵn có 600 ms, người gác quay mặt về expected. Ô thoại “Với ngựa gỗ, đáp án kỳ vọng lấy từ đâu?” hiện. Dừng 2 giây. Nắp ngựa vẫn đóng.
B4: hiện “Mỗi test = đầu vào + oracle”. Một đường nối mảnh gom hai phần, không đổi dấu bằng thành dấu tick.
Chuyển trang: giữ màu nhánh expected làm màu nhấn cho các oracle ở slide 10. Manh mối giữ 1/4.

## Slide 10 | 5 dạng oracle

Mục tiêu: mỗi oracle đi với một thao tác trực quan ngắn, vẫn đọc được cả danh sách.

B0: tiêu đề, năm vị trí hàng được giữ sẵn.
B1: hàng 01 hiện. Nhấn True trong ví dụ 400 ms, thumbnail ngựa đứng yên. Đây là giá trị biết trước.
B2: hàng 02 hiện. Cùng một dãy nhỏ đi vào hai nhánh my_sort và sorted trong 600 ms, đầu ra đặt cạnh nhau. Không coi chuẩn tham chiếu tuyệt đối không thể sai.
B3: hàng 03 hiện. Một khối x đi qua encode rồi decode, trở lại x trong 900 ms. Toàn bộ chuỗi chỉ là minh họa vòng khứ hồi.
B4: hàng 04 hiện. Hai bản thumbnail cùng một ngựa, bản thứ hai lật ngang 450 ms. Liên kết hai kết quả bằng nhau. Chữ và số thứ tự không bị lật.
B5: hàng 05 hiện. Một tín hiệu chạy tới điểm kết thúc, hiện “không crash / không treo”. Không gắn huy hiệu “đúng nghiệp vụ”.
B6: hiện câu kết. Tất cả năm hàng giữ đủ tương phản, dừng chuyển động.
Chốt: số 01–05 là thứ tự trình bày, không phải xếp hạng độ mạnh. Không thêm một oracle thứ sáu vào bảng.

## Slide 11 | Code sai, test vẫn PASS?

Mục tiêu: cho khán giả nhìn thấy việc chép output tạo oracle sai.

B0: tiêu đề và câu hỏi. Chưa lộ kết quả hai cột.
B1: hiện bài toán 100.000 giảm 10%, nhấn 90.000 400 ms. Đây là mốc đúng được giữ trên màn hình.
B2: cột trái hiện actual = 85_000. Một bản sao số 85_000 di chuyển từ actual xuống chỗ expected trong assert trong 650 ms. Đường đi chỉ nằm trong cột trái. Dừng hỏi “Test có qua không?” khoảng 2 giây.
B3: PASS xanh hiện 250 ms, sau 350 ms hiện “Code và kỳ vọng cùng sai.” Thêm gạch hổ phách nối với đáp án 90.000 ở trên. Không biến PASS thành FAIL, vì assertion trái thực sự pass.
B4: cột phải hiện actual = 85_000. Giá trị 90_000 đi từ dòng yêu cầu xuống expected trong 650 ms, bằng một đường khác với cột trái.
B5: FAIL đỏ hiện cùng “Test phát hiện kết quả sai.” Nhấn nguồn của hai giá trị kỳ vọng, không nhấn việc người hay AI viết chúng.
Chốt: cùng actual, khác nguồn expected. Kết cảnh giữ hai cột song song, không fade mất cột trái.

## Slide 12 | Oracle độc lập ở cổng thành Troy

Mục tiêu: chuyển góc nhìn từ bên ngoài sang bằng chứng bên trong.

B0: ngựa gỗ ở vị trí quen thuộc, nắp đóng. Tiêu đề hiện.
B1: hiện câu hỏi “Bên trong có người ẩn nấp không?”. Người gác nghiêng đầu về nắp ngựa khoảng 5°, dừng 2 giây.
B2: hiện “Nguồn kiểm tra khác” và nguồn “Lính từng giao tranh”. Nhân vật lính chỉ vào ngựa. Không tự động xuất hiện tick chứng nhận an toàn.
B3: hiện “Thông tin tình báo”, một mẩu thông tin đi tới người gác 500 ms. Đây là nguồn khác, không phải sao chép kết quả is_horse.
B4: hiện “Cảm biến bên trong”. Vùng quét được giới hạn trong thân ngựa, lớp vỏ giảm opacity để lộ bóng lính 700 ms. Chú thích trong lời nói: hình cắt lớp là minh họa về nguồn kiểm tra, không khẳng định cảm biến luôn đúng. Ngựa và người gác không đổi thiết kế.
B5: hiện hướng dẫn với AI, nhấn “yêu cầu / đặc tả” rồi “căn cứ của đáp án”, mỗi cụm 400 ms.
B6: hiện Manh mối 2 và sáng ô 2/4. Giữ nguyên dòng về việc chưa nghĩ tới ngựa gỗ chứa lính, nói rõ đây còn là khoảng trống đầu vào; độc lập oracle là vấn đề về căn cứ expected, không chỉ về số người viết test.
Chuyển ý: “Có nguyên tắc rồi, làm sao sinh những tổ hợp đầu vào chưa nghĩ tới?”

## Slide 13 | Từ vài ví dụ sang nguyên tắc

Mục tiêu: nhìn được generator, property và nhánh shrinking có điều kiện.

B0: tiêu đề và ý chuyển từ ví dụ sang tính chất.
B1: hiện code nguyên khối. Nhấn @given và st.lists(st.integers()), sau đó hiện phần giải thích công cụ tự sinh đầu vào.
B2: generator sáng. 5–7 thẻ danh sách đại diện đi tới property, mỗi thẻ lệch nhau 120 ms. Không dựng hàng nghìn vật thể hoặc giả bộ đếm số test đã chạy. Nhấn sorted(sorted(xs)) == sorted(xs).
B3: hiện phần giải thích shrinking và nhánh “(nếu fail) shrinking”. Với ví dụ sorted hiện tại, không tạo ra lỗi giả. Minh họa nhánh bằng nét đứt và một thẻ ghi “nếu có phản ví dụ”, tách khỏi luồng pass.
B4: thẻ giả định trên nhánh fail thu gọn 3 kích thước trong 900 ms rồi dừng ở “phản ví dụ tối thiểu”. Nói rõ đây là sơ đồ cơ chế, không phải log của test sort hiện tại. Trong lời nói, dùng “đơn giản hơn theo chiến lược shrink”, không hứa luôn đạt tối thiểu toàn cục.
B5: hiện dòng công cụ và giữ sơ đồ hoàn chỉnh. Thanh manh mối giữ 2/4.

## Slide 14 | Demo: Troy thu nhỏ

Mục tiêu: liên hệ từng phần code với phản ví dụ mà không dựng bằng chứng chạy thật.

B0: tiêu đề và code. Dành vùng riêng cho output, không phủ lên code.
B1: tô dataclass Thing và từng trường liên quan. Nhấn contains_person là sự thật mô hình giả định có nguồn độc lập. Giữ kind, is_alive nhưng chưa suy diễn chúng là gỗ hay sống thật.
B2: tô gate_allows và return t.looks_like_horse. Cạnh hình cổng chỉ sáng một tín hiệu hình dáng. Cho thấy is_alive và contains_person không tham gia quyết định của hàm hiện tại.
B3: tô generator. Một vài thẻ tổ hợp đi tới cổng trong 900 ms. Nói generator sinh độc lập các trường nên có thể tạo tổ hợp không tự nhiên, kind là nhãn chứ không ràng buộc mọi đặc tính.
B4: tô property rồi hiện phát biểu bằng lời. Nhấn điều kiện gate_allows(t), sau đó assert not t.contains_person. Chưa hiện FAIL trước khi khán giả thấy nguyên tắc.
B5: hiện đúng tuple trong slide: Thing(kind='horse', looks_like_horse=True, is_alive=False, contains_person=True). Đánh sáng looks_like_horse=True làm cổng mở, sau đó contains_person=True vi phạm assertion. Hiện dấu lỗi. Đây là phản ví dụ của mô hình; kind='horse' không chứng minh công cụ đã sinh đúng vật thể wooden_horse.
B6: nếu có output chạy thật đã xác nhận, trình chiếu đoạn shrinking ghi sẵn từ chính lần chạy đó. Nếu chưa có, dùng ba khung kích thước thu nhỏ có nhãn “minh họa shrinking”, không giả terminal, không khẳng định tuple là kết quả được chạy ở máy này. Hình ngựa mở nắp chỉ là liên hệ truyện Troy.
B7: hiện câu kết. Nói giới hạn: generator phải bao phủ trường hợp, property phải phản ánh ý định, mô hình cảm biến cũng là giả định.
Điều kiện triển khai: agent chạy ví dụ và ghi phiên bản/seed hoặc giữ chế độ minh họa. Không tuyên bố mọi phiên bản Hypothesis đều shrink về đúng tuple trên slide. Không đổi chữ hiện có trong PPTX ở lần sửa note này.

## Slide 15 | Giới hạn của Property-based Testing

Mục tiêu: tạo lần bất ngờ thứ hai bằng một property pass nhưng không đủ.

B0: tiêu đề và ý “Property tốt đến từ ý nghĩa bài toán...”.
B1: hiện my_sort trả []. Một dãy có phần tử đi vào hàm, đầu ra trở thành [] trong 650 ms. Hiện assert is_ascending(my_sort(xs)), dấu pass xanh và “Property yếu: pass nhưng vô nghĩa”. Không mô phỏng sort đúng.
B2: hiện đoạn giải thích chất lượng property. Dừng 1 giây. Chốt lời: cần những ràng buộc khác, chẳng hạn bảo toàn phần tử, để phát hiện lỗi này.
B3: hiện lần lượt giới hạn generator và lấy mẫu. Một vùng đầu vào chưa được chạm tới giữ màu nhạt, không biến thành biểu đồ thống kê có số liệu giả.
B4: hiện vai trò AI đề xuất và người duyệt. Chuyển spotlight từ code sang phát biểu ý định, 450 ms.
B5: hiện Manh mối 3. Hai ảnh ngựa gốc/lật cùng đi vào một hộp minh họa “luôn True”, hai đầu ra True bằng nhau. Chỉ relation flip pass, không nói cả sáu test ở slide 4 đều pass với hàm luôn True.
B6: sáng ô 3/4. Dừng ở câu “nhất quán” và “đúng” được nhấn khác nhau.

## Slide 16 | Thuật sĩ viết 200 bài kiểm tra trong một phút. Ai kiểm tra thuật sĩ?

Mục tiêu: từ cảm giác nhiều test sang câu hỏi review cụ thể.

B0: tiêu đề và nhãn giả thuyết hiện cùng lúc. Đũa phép có sẵn xoay khoảng 12° rồi dừng. Nếu tạo thuật sĩ mới, giữ nét vẽ đơn giản và không chiếm vùng chữ.
B1: ba nhóm tờ test bung ra trong 700 ms rồi xếp gọn. “200” là hình ảnh trong tiêu đề, không hiển thị bộ đếm tốc độ hay benchmark AI giả.
B2: hiện Tautology và Assertion yếu. Vòng sao chép actual sang expected xuất hiện một lần ở lề, gợi lại slide 11. Không chạy vòng lặp vô hạn.
B3: hiện Mock quá mức và Coverage ảo. Đường nối thành phần thật bị lớp mock che, rồi highlight vùng che 500 ms. Giữ phần chữ đọc được.
B4: hiện các rủi ro còn lại: ảo giác API/hành vi, test giòn, bỏ sót biên/lỗi/concurrency/bảo mật. Reveal theo nhóm, không bảy dòng bay từ bảy hướng.
B5: hiện checklist 5 câu. Dải sáng lần lượt đi qua câu 1→5 với 250 ms mỗi câu rồi tắt. Đây là câu hỏi cần review, chưa được đánh tick “đã đạt”.
B6: hiện câu công bằng ở cuối. Giữ tất cả nội dung và dừng chuyển động để người nói chọn điểm cần đào sâu.
Manh mối giữ 3/4. Không thêm một manh mối riêng cho AI.

## Slide 17 | Mutation testing = cài gián điệp giả

Mục tiêu: đảo kỳ vọng thị giác, test fail lại là phát hiện tốt.

B0: tiêu đề và câu định nghĩa. Một gián điệp giả nhỏ có nhãn “mutant” đứng ở lề, không đóng vai kẻ tấn công thực.
B1: hàng all(...) → any(...) hiện. Token all đổi thành any trong 400 ms. Test hổ phát hiện thay đổi; FAIL đỏ của test hiện rồi nhãn “Bị giết: test có tác dụng” xuất hiện. Người gác chặn gián điệp. Dùng cả chữ để tránh hiểu đỏ là chất lượng kém ở trường hợp này.
B2: hàng xóa has_hooves hiện. Nhãn đặc trưng bị gạch đi, test vẫn xanh. Gián điệp đi qua, hiện “Sống sót” hổ phách. Không nổ cổng, vì đây là bài tập nhân tạo.
B3: hàng xóa has_mane hiện theo cùng ngữ pháp. Giữ ba hàng để so sánh.
B4: hiện mutation score và câu coverage. Không thêm số đo từ chạy thật. Nếu dùng minh họa 1/3 từ ba hàng, bắt buộc gọi là “3 mutant minh họa”, không trình bày như score toàn bộ dự án; ưu tiên bỏ con số.
B5: hiện giới hạn và công cụ. Nhắc mutant tương đương có thể không bị giết dù test hợp lý; score cần quy ước xử lý rõ.
Điều kiện: bảng là kịch bản minh họa cho bộ đặc trưng, cần xác nhận has_* và dữ liệu hổ/chó trước khi gọi là kết quả thực nghiệm. Nếu chưa chạy, luôn ghi trong lời nói “theo ví dụ minh họa này”.

## Slide 18 | Bức tường được chứng minh theo bản vẽ

Mục tiêu: làm rõ code đúng theo đặc tả vẫn có thể không đáp ứng mục đích.

B0: tiêu đề. Hiện các nhãn example test, property-based, fuzzing, model checking, Proof theo nhóm như slide. Không hoạt họa thành thang phần trăm hay mức an toàn tăng đều.
B1: hiện định nghĩa Formal Verification và phạm vi chứng minh cùng nhau. Gạch sáng “điều kiện đã nêu” và “giả định của mô hình”, không hiện chữ “đúng tuyệt đối”.
B2: bản vẽ và dòng “cho ngựa vào” xuất hiện. Đặt khung tô sáng quanh tiêu chí hình dáng hiện có của ví dụ. Tường thành được viền sáng theo bản vẽ 700 ms, chỉ tượng trưng việc khớp đặc tả.
B3: hiện Verification: “Hàm làm đúng đặc tả?”. Năm đặc trưng sáng và ngựa gỗ được hàm trả True. Giữ CI xanh, cổng hé mở. Chứng minh chỉ gắn với tiêu chí đã hình thức hóa, không chứng minh ngựa gỗ là ngựa thật.
B4: hiện Validation: “Đặc tả đáp ứng mục đích?”. Ngắt cảnh tại ngưỡng cửa. Nhấn tương phản giữa “trông giống ngựa” và “ngựa thật”, dùng gạch chân và chữ, không chỉ đổi màu.
B5: hiện Manh mối 4, sáng ô 4/4. Nói rõ sai lệch ở tiêu chí cho qua, không phải toán học tự chứng minh một điều sai.
Điểm dừng: 2 giây trên hai câu Verification/Validation. Không thêm màn proof checker thực thi nếu chưa có bài chứng minh thật.

## Slide 19 | Người – AI – Công cụ

Mục tiêu: theo dõi nguồn kỳ vọng qua quy trình có người thẩm định.

B0: tiêu đề. Bốn vị trí giữ cố định.
B1: hiện bước 1 Người và câu “ai được vào?”. Một tờ đặc tả có dấu nhận diện xuất hiện.
B2: tờ đặc tả đi tới bước 2 AI trong 500 ms, các test xuất hiện từ đây. Giữ dấu nhận diện nguồn yêu cầu trên expected, không kéo expected từ output code.
B3: test đi tới bước 3 Công cụ, hiện PBT, mutation, fuzzing, contract test. Không auto tick tất cả thành đã chạy.
B4: kết quả quay về bước 4 Người trong 600 ms. Người review chỉ vào kỳ vọng, sau đó đường quay lại bước 1 hiện, diễn tả cập nhật yêu cầu/test khi cần. Dừng vòng sau một lượt.
B5: bảng loại code/kỹ thuật hiện lần lượt bốn hàng cách nhau 200 ms. Nhấn đây là gợi ý theo rủi ro và bối cảnh, không là danh sách bắt buộc hay bảo đảm CRUD chỉ cần một kiểu test.
B6: hiện dòng nguyên tắc cuối. Giữ quy trình và bảng đủ sáng, không loop token khi đọc bảng.
Manh mối giữ 4/4. Không thêm bước thứ năm vào quy trình.

## Slide 20 | Vì sao tất cả đều xanh mà pháo đài vẫn thất thủ?

Mục tiêu: trả lời câu hỏi bằng bốn nguyên nhân, nối lại đúng cảnh đã xem.

B0: câu hỏi hiện, thu nhỏ cảnh cổng ở lề và CI xanh làm điểm neo. Bốn nội dung chưa hiện. Thanh tiến độ đã hoàn thành, không xóa lịch sử khám phá.
B1: hiện ý 1. Spotlight ô 1, một khung chỉ bao người gác gợi lại Unit. Không nói E2E chắc chắn bắt mọi tấn công.
B2: hiện ý 2. Spotlight ô 2, nhánh expected hiện nguồn bên ngoài code và hình ngựa cắt lớp thu nhỏ. Nói độc lập nằm ở căn cứ, không chỉ ở việc đổi người/đổi AI.
B3: hiện ý 3. Spotlight ô 3, hai đầu ra True bằng nhau gợi lại flip. Dừng 1 giây để khán giả nhận ra tính nhất quán chưa đủ.
B4: hiện ý 4. Spotlight ô 4, “trông giống” được tách thị giác khỏi “thật”, đường nối giả định giữa chúng chuyển sang dấu hỏi. Không phủ hình lên chữ của slide.
B5: cả bốn ô sáng đều, toàn bộ ý giữ nguyên để đọc. Cổng dừng ở ngưỡng quyết định, CI vẫn xanh.
Chốt lời mới: unit-only bỏ sót luồng, căn cứ kỳ vọng chưa đủ độc lập, property yếu, tiêu chí không đúng ý định. Không quy mọi lỗi oracle về “cùng một cái đầu”.

## Slide 21 | Trở lại cổng thành

Mục tiêu: trở lại khung hình đầu bài và để lại một câu hỏi.

B0: cùng cảnh cổng slide 1, chuyển vào bằng crossfade 600 ms. Ngựa đứng ngoài, người gác tỉnh táo nhìn cả ngựa và bảng yêu cầu. Không mở cổng tự động chỉ vì thấy CI xanh.
B1: hiện “Khi nào cánh cổng nên mở?”. Người gác hạ mắt về yêu cầu, rồi nhìn ngựa. Tối đa một chuyển động 600 ms, sau đó đứng yên.
B2: hiện THANK YOU và phụ đề hiện có 400 ms. Giữ câu hỏi đọc được. Không thêm ba gạch đầu dòng “điều mang về” vì slide không có các dòng đó.
Điểm dừng: cảnh tĩnh để cảm ơn và Q&A. Không tuyên bố cổng đã được bảo đảm an toàn hoặc bật tất cả hệ thống phòng thủ bằng tick xanh.
Lời chốt gợi ý: “Người Troy không thiếu test. Câu hỏi còn thiếu là: khi nào cánh cổng thật sự nên mở?”
Phụ lục Q&A cũ giữ trong note, không tự hiện thành lớp chữ khi bấm tiếp.

## Điều kiện nghiệm thu khi agent triển khai

1. Chạy thử từng bước tiến/lùi của cả 21 slide, nhất là cổng mở, nắp ngựa và lớp lính. Không có hoạt ảnh chạy tiếp ở slide đã rời.
2. Cảnh 6 vẫn giữ CI xanh khi thành thất thủ. Ngựa gỗ lăn bằng bánh, chỉ mở nắp ở đúng bước.
3. Code không bị typewriter hoặc dịch chuyển vị trí khi highlight. Các dấu PASS/FAIL gắn đúng assertion hoặc mutation.
4. Slide 13 không giả lỗi của sorted. Slide 14 phân biệt kind='horse' với wooden_horse và đánh dấu minh họa khi chưa chạy thật. Slide 17 không dựng score đo được.
5. Chỉ có 4 manh mối và giữ đúng mốc 8/12/15/18. Slide 21 không yêu cầu nội dung vắng mặt.
6. Chế độ reduced motion, xuất PDF và bấm nhanh đều giữ được ý nghĩa. Xem thử ở khung 16:9 và màn hình trình chiếu thực tế trước buổi nói.
