import React from 'react';
import PostCodeModal from '../account/PostCodeModal';
import Button from '../common/Button';
import Select from '../common/Select';
import TextInput from '../common/TextInput';

const ShippingAddress = ({ }) => {
   return (
      <div>
         <div className="shipping-wrapper">
            <div className="shipping-title-label">
               <label>{shippingTitle}</label>
            </div>
            <div className="shipping-name-input">
               <input type="text" placeholder="이름을 입력하세요" />
               <TextInput
                  type={"text"}
                  name={"user_name"}
                  placeholder={"이름을 입력하세요"}
                  value={signUpForm.user_name}
                  onChange={handleChange}
               />
            </div>
            <div className="shipping-tel" >
               <div className="shipping-tel-label">
                  <label>TEL</label>
               </div>
               <div className="shipping-tel-select">
                  <Select
                     className={"selectTel"}
                     options={[
                        { value: "010", label: "010" },
                        { value: "011", label: "011" },
                        { value: "02", label: "02" },
                        { value: "031", label: "031" },
                     ]}
                     defaultValue={"010"}
                     onChange={handleSelectTelChange}
                  />
               </div>
               <div>
                  <label>-</label>
               </div>
               <div className="shipping-tel-middle">
                  <TextInput
                     type={"text"}
                     name={"mid_tel"}
                     placeholder={"1234"}
                     value={userTel.mid_tel}
                     onChange={handleInputTelChange}
                  />
               </div>
               <div>
                  <label>-</label>
               </div>
               <div className="shipping-tel-last">
                  <TextInput
                     type={"text"}
                     name={"last_tel"}
                     placeholder={"5678"}
                     value={userTel.last_tel}
                     onChange={handleInputTelChange}
                  />
               </div>
               <div className="shipping-email-label">
                  <label>EMAIL</label>
               </div>
               <div className="shipping-email-input">
                  <TextInput
                     type={"text"}
                     name={"email_id"}
                     placeholder={"EMAIL 입력"}
                     value={userEmail.email_id}
                     onChange={handleInputEmailChange}
                  />
               </div>
               <div className="shipping-email-label">
                  <label>@</label>
               </div>
               <div className="shipping-email-select">
                  <Select
                     className={"selectEmail"}
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
                     defaultValue={"naver.com"}
                     onChange={handleSelectEmailChange}
                  />
               </div>
               <div className="shipping-baseAddr" >
                  <div className="shipping-baseAddr-label">
                     <label>기본주소</label>
                  </div>
                  <div className="shipping-baseAddr-input">
                     <TextInput
                        type={"text"}
                        name={"base_address"}
                        value={userAddress.base_address}
                        readOnly
                     />
                  </div>
                  <div className="shipping-baseAddr-btn">
                     <Button
                        className={"searchAddr"}
                        btnTxt={"도로명/지번 주소검색"}
                        onClick={handleOpenPostCode}
                     />
                     <Modal
                        isOpen={isPostCodeOpen}
                        onRequestClose={handleClosePostCode}
                        style={customModalStyle}
                     >
                        <PostCodeModal
                           onClose={handleClosePostCode}
                           onSelectAddress={handleSelectAddress}
                        />
                     </Modal>
                  </div>
               </div>
               <div className="shipping-detailAddr" >
                  <div className="shipping-detailAddr-label">
                     <label>상세주소</label>
                  </div>
                  <div className="shipping-detailAddr-input">
                     <TextInput
                        type={"text"}
                        name={"detail_address"}
                        placeholder={"상세주소를 입력하세요"}
                        value={userAddress.detail_address}
                        onChange={handleInputAddressChange}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ShippingAddress;