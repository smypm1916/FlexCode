import React, { useState } from "react";
import Modal from "react-modal";
import {
  BaseAddress,
  Container_Style,
  Input_Box,
  Input_Wrapper,
  Title,
} from "../../style/Common_Style";
import {
  Email_Box,
  Phone_Box,
  Post_Wrapper
} from "../../style/SignUp_Style";
import PostCodeModal from "../account/PostCodeModal";
import Button from "../common/Button";
import Select from "../common/Select";
import TextInput from "../common/TextInput";

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
    <Container_Style className="Shipping">
      <Title>{title}</Title>
      <Input_Wrapper>
        <label>이름</label>
        <Input_Box>
          <TextInput
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Input_Box>
      </Input_Wrapper>
      <Input_Wrapper>
        <label></label>
        <Post_Wrapper>
          <Button
            btnTxt="Searching Address"
            onClick={() => setIsPostCodeOpen(true)}
            disabled={isReadOnly}
          />
          <BaseAddress>
            <TextInput
              name="base_address"
              placeholder="Address 1"
              value={data.base_address}
              onChange={handleChange}
              readOnly
            />
          </BaseAddress>

          <Modal
            isOpen={isPostCodeOpen}
            onRequestClose={() => setIsPostCodeOpen(false)}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경색
                zIndex: 300,
              },
              content: {
                width: "40%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "static", // static으로 변경
                background: "white",
                padding: "20px",
                borderRadius: "0",
                border: "none",
                padding: "50px",
              },
            }}
          >
            <PostCodeModal
              onClose={() => setIsPostCodeOpen(false)}
              onSelectAddress={handleSelectAddress}
            />
          </Modal>
        </Post_Wrapper>
      </Input_Wrapper>
      <Input_Wrapper>
        <label>Address 2</label>
        <Input_Box>
          <TextInput
            name="detail_address"
            placeholder="Address 2"
            value={data.detail_address}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Input_Box>
      </Input_Wrapper>
      <Input_Wrapper>
        <label>Tel No.</label>
        <Phone_Box>
          <Select
            options={[
              { value: "010", label: "010" },
              { value: "011", label: "011" },
              { value: "02", label: "02" },
              { value: "031", label: "031" },
            ]}
            value={data.tel_first}
            onChange={handleSelectTelChange}
            disabled={isReadOnly}
          />
          <label>-</label>
          <Input_Box>
            <TextInput
              name="tel_mid"
              placeholder="1234"
              value={data.tel_mid}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Input_Box>

          <label>-</label>
          <Input_Box>
            <TextInput
              name="tel_last"
              placeholder="5678"
              value={data.tel_last}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Input_Box>
        </Phone_Box>
      </Input_Wrapper>
      <Input_Wrapper>
        <label>E-mail</label>
        <Email_Box>
          <Input_Box>
            <TextInput
              name="email_id"
              placeholder="E-mail Address"
              value={data.email_id}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Input_Box>

          <label>@</label>

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
        </Email_Box>
      </Input_Wrapper>
    </Container_Style>
  );
};

export default ShippingAddress;
