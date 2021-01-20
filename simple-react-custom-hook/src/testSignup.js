import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  privacyAgreement,
  requiredAgreement,
  serviceAgreement,
  confirmAbove14,
  lifeTimeCustomer,
  phoneVerificationFailMessage,
  notAuthPhoneMessage,
  emailTaken,
  emailTakenKr,
  verifyEmail,
  visitEmail,
  failSignUp,
  passwordPolicy,
} from "@/common/constants/strings";
import Countdown from "@/common/shared/countdown";
import { emailValidation } from "@/common/utils/signup";
import { signupLogin, getPhoneToken, verifyPhoneNumber } from "@/api/signup";
import Alert from "@/components/layout/alert";
import dynamic from "next/dynamic";
import FacebookLogin from "@/components/login/facebook-login";
import { checkPasswordValid } from "@/common/utils/common";

interface ITestProps { }

function useInput(initialValue, callback?: (value: any) => boolean) {
  const [value, setValue] = useState(initialValue);
  const [validation, setValidation] = useState<boolean>(false);

  useEffect(() => {
    if (callback) {
      const isValidated = callback(value);
      setValidation(isValidated);
    } else {
      if (value) {
        setValidation(true);
      } else {
        setValidation(false);
      }
    }
  }, [value]);

  const bind = {
    value,
    onChange: e => {
      setValue(e.target.value)
    },
  };

  return [value, bind, validation]
}

const Test: React.FC<ITestProps> = () => {
  const [email, bindEmail, isEmailValidated] = useInput("", emailValidation);
  const [name, bindName, isNameValidated] = useInput("");
  const [password, bindPassword, isPasswordValidated] = useInput("", checkPasswordValid);
  const [confirmPassword, bindConfirmPassword] = useInput("");
  const [phone, bindPhone] = useInput("");
  const [code, bindCode] = useInput("");
  const [passwordNotSame, setPasswordNotSame] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
    } else {
    }
    // if (password !== confirmPassword) {
    //   setIsValid({ ...isValid, isPasswordNotSame: false })
    // } else {
    //   setIsValid({ ...isValid, isPasswordNotSame: true })
    // }
  }


  return (
    <div id="contents">
      <div className="container sub_title">
        <div className="tit">JOIN</div>
        <div className="txt">회원가입</div>
      </div>

      <div className="container">
        <div className="login_wrap">
          <form onSubmit={handleSubmit}>
            <div className="form_wrap">
              <div className="input_box">
                <div className="tit">이메일</div>
                <div className="input"><input type="text" placeholder="이메일을 입력하세요." {...bindEmail} /></div>
                {/* {isValid.isEmailNotValid && <p className="warning">형식에 맞는 이메일을 입력해주세요</p>} */}
              </div>

              <div className="input_box">
                <div className="tit">이름</div>
                <div className="input"><input type="text" placeholder="이름을 입력하세요." {...bindName} /></div>
                {/* {nameNotValid.current && <p className="warning">이름을 입력해주세요</p>} */}
              </div>

              <div className="input_box">
                <div className="tit">비밀번호</div>
                <div className="input"><input type="password" placeholder="비밀번호를 입력하세요." {...bindPassword} /></div>
                <div className="input"><input type="password" placeholder="비밀번호를 확인하세요." {...bindConfirmPassword} /></div>
                {/* {!passwordValidation() && <p className="warning">영문, 숫자를 포함한 8-20자를 입력해주세요</p>}
              {passwordNotSame && <p className="warning">비밀번호가 일치하지 않습니다</p>} */}
              </div>

              <div className="input_box">
                <div className="tit">휴대전화</div>
                <div className="input"><input type="tel" maxLength={11} placeholder="휴대전화를 입력하세요." {...bindPhone} /></div>
                {/* {phoneNotValid.current && <p className="warning">잘못된 번호양식입니다</p>} */}
              </div>
            </div>

            <div className="login_btns">
              <button type="button" className="btn_bk btn_sm">본인인증</button>
            </div>

            {/* <div className="agree_box">
            <ul className="board_fold" id="listFold">
              <li className="agree_all">
                <label className="check_skin">
                  <input type="checkbox" /><span>사용자 약관 전체 동의</span>
                </label>
              </li>
              <li>
                <label className="check_skin">
                  <input type="checkbox" /><span>서비스 이용 약관 동의 (필수)</span>
                </label>
                <div className="tit"></div>
                <div className="view">
                  1. 개인정보를 제공받는 자 : Guesthouse Mobyul<br />
              2. 제공하는 개인정보 항목 : [필수] 스테이폴리오 아이디, 이름, 연락처, 이메일주소, 인원정보<br />
              3. 개인정보를 제공받는 자의 이용목적 : 사업자회원과 예약이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리, 분쟁조정 해결을 위한 기록보존<br />
              4. 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 개인정보 이용목적 달성 시 까지 보존합니다.<br />
              5. 동의 거부권 등에 대한 고지 : 정보주체는 개인정보 제공 동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이 제한될 수 있습니다.<br />
              1. 개인정보를 제공받는 자 : Guesthouse Mobyul<br />
              2. 제공하는 개인정보 항목 : [필수] 스테이폴리오 아이디, 이름, 연락처, 이메일주소, 인원정보<br />
              3. 개인정보를 제공받는 자의 이용목적 : 사업자회원과 예약이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리, 분쟁조정 해결을 위한 기록보존<br />
              4. 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 개인정보 이용목적 달성 시 까지 보존합니다.<br />
              5. 동의 거부권 등에 대한 고지 : 정보주체는 개인정보 제공 동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이 제한될 수 있습니다.
						</div>
              </li>
              <li>
                <label className="check_skin">
                  <input type="checkbox" /><span>개인정보 취급방침 동의 (필수)</span>
                </label>
                <div className="tit"></div>
                <div className="view">
                  1. 개인정보를 제공받는 자 : Guesthouse Mobyul<br />
              2. 제공하는 개인정보 항목 : [필수] 스테이폴리오 아이디, 이름, 연락처, 이메일주소, 인원정보<br />
              3. 개인정보를 제공받는 자의 이용목적 : 사업자회원과 예약이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리, 분쟁조정 해결을 위한 기록보존<br />
              4. 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 개인정보 이용목적 달성 시 까지 보존합니다.
						</div>
              </li>
              <li>
                <label className="check_skin">
                  <input type="checkbox" /><span>마케팅 정보 수신 동의 (선택)</span>
                </label>
                <div className="tit"></div>
                <div className="view">
                  1. 개인정보를 제공받는 자 : Guesthouse Mobyul<br />
              2. 제공하는 개인정보 항목 : [필수] 스테이폴리오 아이디, 이름, 연락처, 이메일주소, 인원정보
						</div>
              </li>
            </ul>
          </div> */}

            <div className="login_btns">
              <button type="button" className="btn_bk" onClick={handleSubmit}>회원가입</button>
            </div>

            <div className="sns_btns">
              <button type="button" className="btn-fb">페이스북으로 시작하기</button>
              <button type="button" className="btn-naver">네이버로 시작하기</button>
              <button type="button" className="btn-apple">애플로 시작하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Test;
