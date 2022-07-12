import AppLayout from "../components/AppLayout";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import Head from "next/head";



const Profile = () => {
    const followerList = [{ nickname: '좀드' }, { nickname: '바보' }, { nickname: '좀버드' }];
    const followingList = [{ nickname: '좀드' }, { nickname: '바보' }, { nickname: '좀버드' }];

    return (
        <>
            <Head>
                <title>내 프로필 | ZoMbird</title>
            </Head>
            <AppLayout>
            <NicknameEditForm />
            <FollowList
                 header="팔로잉 목록"
                 data={followingList}
            />
            <FollowList
                 header="팔로워 목록"
                 data={followerList}
            />
            </AppLayout>
        </>
    );
};

export default Profile;