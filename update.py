import codecs

html_path = 'd:\\งานเนสอยาลบ\\phone-installment\\index.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    html = f.read()

# Replace links targeting Line
html = html.replace('href="#" class="btn', 'href="https://lin.ee/s3jHf19" target="_blank" class="btn')
html = html.replace('href="#" class="floating-line-btn', 'href="https://lin.ee/s3jHf19" target="_blank" class="floating-line-btn')
html = html.replace('href="#" class="btn btn-primary d-md-none"', 'href="https://lin.ee/s3jHf19" target="_blank" class="btn btn-primary d-md-none"')

old_footer = '''                        <li><i class="fa-solid fa-location-dot"></i> บริษัท ดีดี มันนี่ จำกัด (สาขาใหญ่) กรุงเทพมหานคร</li>
                        <li><i class="fa-solid fa-phone"></i> 02-XXX-XXXX</li>
                        <li><i class="fa-brands fa-line"></i> @ddmoney (มี @ นำหน้า)</li>'''

new_footer = '''                        <li><i class="fa-solid fa-building"></i> บริษัท ดีดีมันนี่ จำกัด (DDMONEY CO., LTD.)</li>
                        <li><i class="fa-solid fa-location-dot"></i> ที่อยู่ 72/47-48ก ถนนชัยประสิทธิ์ ต.ในเมือง อ.เมือง จ.ชัยภูมิ 36000</li>
                        <li><i class="fa-solid fa-clock"></i> เวลาทำการ : จันทร์ - อาทิตย์ เวลา 09.00 - 20.00 น.</li>
                        <li><i class="fa-solid fa-phone"></i> เบอร์โทร : 063-7498941</li>
                        <li><i class="fa-brands fa-line"></i> Line Official : @ddmoney</li>'''

html = html.replace(old_footer, new_footer)

with codecs.open(html_path, 'w', 'utf-8') as f:
    f.write(html)
print("Updated HTML")
