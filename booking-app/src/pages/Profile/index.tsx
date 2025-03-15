import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Avatar, Button, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { RootState } from "../../store";
import ProfileForm from "./UploadDateUser";
import ReservedList from "./ReservedList";

import styles from "./index.module.scss"

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
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Delete your avatar?');

    const getAvatarUrl = useCallback((user: User) => {
        if (user.img) {
            if (user.img.startsWith("http")) {
                return user.img;
            }
            return `${API_BASE_URL}/${user.img.replace(/\\/g, "/")}`;
        }
        return "";
    }, [API_BASE_URL]);
    
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("user");

        if (user) {
            setUserInfo({
                name: user.name,
                email: user.email,
                picture: getAvatarUrl(user),
            });
        } else if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, [user, getAvatarUrl]);
    
    console.log("user Info", userInfo)
    console.log("state user", user)

    const handleToggleForm = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    const showModal = () => {
        setModalText('Delete your avatar?')
        setOpen(true);
    };

    const handleOk = async () => {
        setModalText('Deleting avatar...');
        setConfirmLoading(true);
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_BASE_URL}/delete-avatar`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                message.success('Avatar deleted successfully');
                setUserInfo((prevUserInfo) => {
                    if (!prevUserInfo) return prevUserInfo;
                    return {
                        ...prevUserInfo,
                        picture: "",
                    };
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                message.error(error.response?.data?.message || 'Error deleting avatar');
            } else {
                message.error('An unknown error occurred');
            }
        } finally {
            setConfirmLoading(false);
            setOpen(false);
        }
    };
    
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div style={{padding: "0 20px"}}>
            {userInfo ? (
                <div>
                    <h2>{t("hello")}, {userInfo.name}</h2>
                    <p>{t("email")}: {userInfo.email}</p>
                    <Avatar
                        size={64}
                        src={userInfo.picture}
                        icon={!userInfo.picture && <UserOutlined />}
                        className={styles['avatar-hover']}
                        onClick={showModal}
                    />
                    <Modal
                        title={modalText}
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                    </Modal>
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
