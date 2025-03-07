import React from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
   const navigate = useNavigate();
   return (
      <div>
         <div>
            {/* 주문 상품 */}
            <div></div>

            {/* 합계 금액 */}
            <div></div>

            {/* 주문자 정보 */}
            <div>
               <div className="order-name" style={style}>
                  <div className="order-name-label">
                     <label>이름</label>
                  </div>
                  <div className="order-name-input">
                     <input type="text" placeholder="이름을 입력하세요" />
                     <TextInput
                        type={"text"}
                        name={"user_name"}
                        placeholder={"이름을 입력하세요"}
                        value={signUpForm.user_name}
                        onChange={handleChange} />
                  </div>
                  <div className="order-tel" style={style}>
                     <div className="order-tel-label">
                        <label>TEL</label>
                     </div>
                     <div className="order-tel-select">
                        <Select
                           className={"selectTel"}
                           options={[
                              { value: "010", label: "010" },
                              { value: "011", label: "011" },
                              { value: "02", label: "02" },
                              { value: "031", label: "031" },
                           ]}
                           defaultValue={"010"}
                           onChange={handleSelectTelChange} />
                     </div>
                     <div>
                        <label>-</label>
                     </div>
                     <div className="order-tel-middle">
                        <TextInput
                           type={"text"}
                           name={"mid_tel"}
                           placeholder={"1234"}
                           value={userTel.mid_tel}
                           onChange={handleInputTelChange} />
                     </div>
                     <div>
                        <label>-</label>
                     </div>
                     <div className="order-tel-last">
                        <TextInput
                           type={"text"}
                           name={"last_tel"}
                           placeholder={"5678"}
                           value={userTel.last_tel}
                           onChange={handleInputTelChange} />
                     </div>
                     <div className="order-email" style={style}>
                        <div className="order-email-label">
                           <label>EMAIL</label>
                        </div>
                        <div className="order-email-input">
                           <TextInput
                              type={"text"}
                              name={"email_id"}
                              placeholder={"EMAIL 입력"}
                              value={userEmail.email_id}
                              onChange={handleInputEmailChange} />
                        </div>
                        <div className="order-email-label">
                           <label>@</label>
                        </div>
                        <div className="order-email-select">
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
                              onChange={handleSelectEmailChange} />
                        </div>
                        <div className="order-baseAddr" style={style}>
                           <div className="order-baseAddr-label">
                              <label>기본주소</label>
                           </div>
                           <div className="order-baseAddr-input">
                              <TextInput
                                 type={"text"}
                                 name={"base_address"}
                                 value={userAddress.base_address}
                                 readOnly />
                           </div>
                           <div className="order-baseAddr-btn">
                              <Button
                                 className={"searchAddr"}
                                 btnTxt={"도로명/지번 주소검색"}
                                 onClick={handleOpenPostCode} />
                              <Modal
                                 isOpen={isPostCodeOpen}
                                 onRequestClose={handleClosePostCode}
                                 style={customModalStyle}>
                                 <PostCodeModal
                                    onClose={handleClosePostCode}
                                    onSelectAddress={handleSelectAddress} />
                              </Modal>
                           </div>
                        </div>
                        <div className="order-detailAddr" style={style}>
                           <div className="order-detailAddr-label">
                              <label>상세주소</label>
                           </div>
                           <div className="order-detailAddr-input">
                              <TextInput
                                 type={"text"}
                                 name={"detail_address"}
                                 placeholder={"상세주소를 입력하세요"}
                                 value={userAddress.detail_address}
                                 onChange={handleInputAddressChange} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* 받는 사람 */}
               <div></div>

               {/* 결제/취소*/}
               <div>
                  {/* 결제하기 */}
                  <Button />
                  {/* 돌아가기 */}
                  <Button />
               </div>
            </div>
         </div>
         )
};

         export default Order;