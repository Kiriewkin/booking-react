import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { RootState } from "../../store";
import ProfileForm from "./UploadDateUser";
import ReservedList from "./ReservedList";

interface User {
    name: string;
    email: string;
    img?: string;
}

interface UserInfo {
    name: string;
    email: string;
    picture?: string;
}

export default function Profile() {
    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const { t } = useTranslation();

    const user = useSelector((state: RootState) => state.auth.user) as User | null;
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [visible, setVisible] = useState(false);

    const getAvatarUrl = useCallback((user: User) => {
        // Если изображение начинается с "https://", значит, это полный URL, и добавлять API_BASE_URL не нужно
        return user.img && user.img.startsWith("http") ? user.img : `${API_BASE_URL}/${user.img?.replace(/\\/g, '/')}`;
    }, [API_BASE_URL]);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        } else if (user) {
            setUserInfo({
                name: user.name,
                email: user.email,
                picture: getAvatarUrl(user),
            });
        }
    }, [user, getAvatarUrl]);



    const handleToggleForm = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    return (
        <div>
            {userInfo ? (
                <div>
                    <h2>{t("hello")}, {userInfo.name}</h2>
                    <p>{t("email")}: {userInfo.email}</p>
                    <Avatar
                        size={64}
                        src={userInfo.picture}
                        icon={!userInfo.picture && <UserOutlined />}
                        style={{ marginBottom: '20px' }}
                    />
                    <div>
                        <Button onClick={handleToggleForm}>
                            {visible ? t("cancel") : t("changeData")}
                        </Button>
                    </div>
                    {visible && <ProfileForm onClose={handleToggleForm} />}
                </div>
            ) : (
                <p>{t("notAuthorized")}</p>
            )}
            <ReservedList />
        </div>
    );
}
