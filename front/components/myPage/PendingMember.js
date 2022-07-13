import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import profile from "../../images/icons/profile.png";

const PendingMember = () => {
	return (
		<PendingMemberBar>
			<PendingMemberProfileIcon>
					<img src={profile} alt="Profile icon" />
			</PendingMemberProfileIcon>
			<PendingMemberUsername>
				이관용
			</PendingMemberUsername>
			<PendingMemberEmail>omomo4426@naver.com</PendingMemberEmail>
			<PendingMemberBtn>
				승인
			</PendingMemberBtn>
			<PendingMemberBtn>
				거절
			</PendingMemberBtn>
		</PendingMemberBar>
	);
};

export default PendingMember;

const PendingMemberBar = styled.div`
	width: 1200px;
	height: 80px;
	border: 1.5px solid #c4c4c4;
	border-radius: 5px;
	display: flex;
  align-items: center;
  
  ${customMedia.lessThan("mobile")`
    width: 295px;
    height: 40px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
    height: 40px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    width: 610px;
    height: 60px;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 880px;
    height: 60px;
  `}
`;

const PendingMemberProfileIcon = styled.div`
	width: 48px;
	height: 48px;
	margin-left: 65px;
  margin-right: 15px;
  
  ${customMedia.lessThan("mobile")`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    margin-right: 5px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    margin-right: 5px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    width: 32px;
    height: 32px;
    margin-left: 25px;
    margin-right: 15px;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 40px;
    height: 40px;
    margin-left: 45px;
    margin-right: 15px;
  `}

	img {
		width: 100%;
    heigt: 100%;
    border-radius: 50%;
	}
`;

const PendingMemberUsername = styled.div`
	font-size: 20px;
  margin-right: 55px;
  
  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    margin-right: 15px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    margin-right: 15px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const PendingMemberEmail = styled.div`
	font-size: 20px;
  flex: 1;
  
  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const PendingMemberBtn = styled.button`
	font-size: 16px;
	font-weight: bold;
	color: #ffffff;
	background-color: #ff6701;
	border: none;
	border-radius: 6px;
	padding: 10px 20px;
	margin-right: 55px;
  cursor: pointer;
  
  ${customMedia.lessThan("mobile")`
    font-size: 8px;
    padding: 2px 5px;
    margin-right: 7px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 8px;
    padding: 2px 5px;
    margin-right: 7px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
    padding: 5px 10px;
    margin-right: 15px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
    padding: 5px 15px;
    margin-right: 25px;
  `}
`;
