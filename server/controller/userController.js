const userService = require("../services/userService");

// 이메일 중복 체크
const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일을 입력하세요" });
    }
    const exists = await userService.checkEmail(email);
    if (exists) {
      return res.json({ exists: true, message: "이미 사용중인 이메일입니다." });
    } else {
      return res.json({ exists: false, message: "사용 가능한 이메일입니다." });
    }
  } catch (error) {
    console.error("이메일 중복 확인 오류", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 닉네임 중복 체크
const checkNickname = async (req, res) => {
  try {
    const { nickname } = req.query;
    if (!nickname) {
      return res
        .status(400)
        .json({ success: false, message: "닉네임을 입력하세요" });
    }
    const exists = await userService.checkNickname(nickname);
    if (exists) {
      return res.json({ exists: true, message: "이미 사용중인 닉네임입니다." });
    } else {
      return res.json({ exists: false, message: "사용 가능한 닉네임입니다." });
    }
  } catch (error) {
    console.error("닉네임 중복 확인 오류", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원가입
const registerUser = async (req, res) => {
  try {
    const userData = req.body; // 클라이언트에서 보낸 회원 데이터

    userData.user_profile = req.file
      ? req.file.filename
      : "default-profile.png";

    // 백엔드에서 받은 데이터 확인
    console.log("회원가입 요청 데이터:", userData);

    const result = await userService.registerUser(userData);

    if (!result) {
      throw new Error("회원가입 실패 - DB 오류");
    }

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 로그인
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("로그인 요청:", { email, password });

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "이메일과 비밀번호를 입력하세요." });
    }

    const result = await userService.loginUser(email, password);

    if (result.success) {
      console.log("로그인 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("로그인 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("로그인 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 이메일 찾기
const findId = async (req, res) => {
  try {
    const { name, tel } = req.body;

    console.log("이메일 찾기 요청:", { name, tel });

    if (!name || !tel) {
      return res
        .status(400)
        .json({ success: false, message: "이름과 전화번호를 입력하세요" });
    }

    const result = await userService.findId(name, tel);

    if (result.success) {
      console.log("이메일 찾기 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("이메일 찾기 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("이메일 찾기 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 비밀번호 찾기(유저검색)
const findPw = async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log("비밀번호 찾기 요청:", { name, email });

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "이름과 이메일을 입력하세요" });
    }

    const exists = await userService.findPw(name, email);

    if (exists) {
      return res.json({ exists: true, message: "회원정보 조회 성공" });
    } else {
      return res.json({ exists: false, message: "회원정보 조회 실패" });
    }
  } catch (error) {
    console.error("비밀번호 찾기 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

const modifyPw = async (req, res) => {
  try {
    const { password, email } = req.body;

    console.log("비밀번호 재설정 요청:", { password, email });

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "비밀번호를 입력하세요." });
    }

    const result = await userService.modifyPw(password, email);

    if (result.success) {
      console.log("비밀번호 재설정 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("비밀번호 재설정 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("비밀번호 재설정 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("회원정보 조회 요청:", email);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일 전달 실패" });
    }

    const result = await userService.getUser(email);

    if (result.success) {
      console.log("회원정보 조회 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("회원정보 조회 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("회원정보 조회 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원정보수정(이미지o)
const updateProfileWithImage = async (req, res) => {
  try {
    const userData = req.body;
    userData.user_profile = req.file;

    console.log("회원정보 수정 데이터:", userData);

    const result = await userService.updateProfileWithImage(userData);

    if (!result) {
      throw new Error("회원정보 수정 실패 - DB 오류");
    }
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("회원정보 수정 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원정보수정
const updateProfile = async (req, res) => {
  try {
    const userData = req.body;

    console.log("회원정보 수정 데이터", userData);

    const result = await userService.updateProfile(userData);

    if (!result) {
      throw new Error("회원정보 수정 실패 - DB 오류");
    }
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("회원정보 수정 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const email = req.body;

    console.log("회원정보 삭제 데이터:", email);

    const result = await userService.deleteUserAccount(email);

    if (!result) {
      throw new Error("회원정보 삭제 실패 - DB 오류");
    }
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("회원정보 삭제 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원 커뮤니티글 조회
const getUserCommunitys = async (req, res) => {
  try {
    const { nickname } = req.body;

    console.log("커뮤니티글 조회 요청:", nickname);

    if (!nickname) {
      return res
        .status(400)
        .json({ success: false, message: "닉네임 전달 실패" });
    }

    const result = await userService.getUserCommunitys(nickname);

    if (result.success) {
      console.log("커뮤니티글 조회 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("커뮤니티글 조회 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("커뮤니티글 조회 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원 구매내역 조회
const getUserOrders = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("구매내역 조회 요청:", email);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일 전달 실패" });
    }

    const result = await userService.getUserOrders(email);

    if (result.success) {
      console.log("구매내역 조회 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("구매내역 조회 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("구매내역 조회 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원 구매내역 상세조회
const getUserOrderDetail = async (req, res) => {
  try {
    const { order_no } = req.query;

    console.log("구매내역 상세 조회 요청:", order_no);

    if (!order_no) {
      return res
        .status(400)
        .json({ success: false, message: "구매번호 전달 실패" });
    }

    const result = await userService.getUserOrderDetail(order_no);

    if (result.success) {
      console.log("구매내역 상세 조회 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("구매내역 상세 조회 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("구매내역 상세 조회 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원 구매내역 주문상태 변경
const updateOrderState = async (req, res) => {
  try {
    const { order_no } = req.query;

    console.log("구매내역 주문상태 변경 요청:", order_no);

    if (!order_no) {
      return res
        .status(400)
        .json({ success: false, message: "구매번호 전달 실패" });
    }

    const result = await userService.updateOrderState(order_no);

    if (result.success) {
      console.log("구매내역 상태 변경 성공:", result);
      return res.status(200).json(result);
    } else {
      console.log("구매내역 상태 변경 실패:", result);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("구매내역 상태 변경 컨트롤러 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = {
  checkEmail,
  checkNickname,
  registerUser,
  loginUser,
  findId,
  findPw,
  modifyPw,
  getUser,
  updateProfileWithImage,
  updateProfile,
  deleteUserAccount,
  getUserCommunitys,
  getUserOrders,
  getUserOrderDetail,
  updateOrderState,
};
