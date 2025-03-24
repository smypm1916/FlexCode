import React, { useState } from 'react';
import Modal from 'react-modal';
import PostCodeModal from '../account/PostCodeModal';
import Button from '../common/Button';
import Select from '../common/Select';
import TextInput from '../common/TextInput';

const ShippingAddress = ({ title, data, setData, isReadOnly }) => {
   const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };

   const handleSelectTelChange = (e) => {
      setData({ ...data, tel_first: e.target.value });
   };

   const handleSelectEmailChange = (e) => {
      setData({ ...data, email_domain: e.target.value });
   };

   const handleSelectAddress = (address) => {
      setData({ ...data, base_address: address });
      setIsPostCodeOpen(false);
   };

   return (
      <div className="shipping-wrapper">
         <h3>{title}</h3>

         <div>
            <TextInput
               name="name"
               placeholder="이름을 입력하세요"
               value={data.name}
               onChange={handleChange}
               readOnly={isReadOnly}
            />
         </div>

         <div className="shipping-baseAddr">
            <TextInput
               name="base_address"
               placeholder="기본주소를 입력하세요"
               value={data.base_address}
               onChange={handleChange}
               readOnly
            />
            <Button btnTxt="주소검색" onClick={() => setIsPostCodeOpen(true)} disabled={isReadOnly} />

            <Modal isOpen={isPostCodeOpen} onRequestClose={() => setIsPostCodeOpen(false)}>
               <PostCodeModal
                  onClose={() => setIsPostCodeOpen(false)}
                  onSelectAddress={handleSelectAddress}
               />
            </Modal>
         </div>

         <div>
            <TextInput
               name="detail_address"
               placeholder="상세주소를 입력하세요"
               value={data.detail_address}
               onChange={handleChange}
               readOnly={isReadOnly}
            />
         </div>

         <div>
            <Select
               options={[
                  { value: '010', label: '010' },
                  { value: '011', label: '011' },
                  { value: '02', label: '02' },
                  { value: '031', label: '031' },
               ]}
               value={data.tel_first}
               onChange={handleSelectTelChange}
               disabled={isReadOnly}
            />

            <TextInput
               name="tel_mid"
               placeholder="1234"
               value={data.tel_mid}
               onChange={handleChange}
               readOnly={isReadOnly}
            />

            <TextInput
               name="tel_last"
               placeholder="5678"
               value={data.tel_last}
               onChange={handleChange}
               readOnly={isReadOnly}
            />
         </div>

         <div>
            <TextInput
               name="email_id"
               placeholder="e-mail을 입력하세요"
               value={data.email_id}
               onChange={handleChange}
               readOnly={isReadOnly}
            />

            <span>@</span>

            <Select
               options={[
                  { value: "naver.com", label: "naver.com" },
                  { value: "hanmail.net", label: "hanmail.net" },
                  { value: "daum.net", label: "daum.net" },
                  { value: "gmail.com", label: "gmail.com" },
                  { value: "nate.com", label: "nate.com" },
                  { value: "hotmail.com", label: "hotmail.com" },
                  { value: "outlook.com", label: "outlook.com" },
                  { value: "icloud.com", label: "icloud.com" },
               ]}
               value={data.email_domain || "naver.com"}
               onChange={handleSelectEmailChange}
               disabled={isReadOnly}
            />
         </div>
      </div>
   );
};

export default ShippingAddress;
