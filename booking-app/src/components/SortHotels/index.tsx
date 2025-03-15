import { useDispatch, useSelector } from "react-redux";
import { SortAscendingOutlined, DownOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";

import { setSortOrder } from "../../store/slices/hotelsSlice";
import { fetchHotels } from "../../store/thunks/hotelsThunk";
import { RootState, AppDispatch } from "../../store";

const SortHotels = () => {
    const dispatch: AppDispatch = useDispatch();
    const currentSort = useSelector((state: RootState) => state.hotels.sortOrder);
    const lang = useSelector((state: RootState) => state.languages.currentLang);
    const currentPage = useSelector((state: RootState) => state.hotels.currentPage)

    const handleSortChange = (sortKey: string) => {
        dispatch(setSortOrder(sortKey));
        dispatch(fetchHotels({ lang, sortOrder: sortKey , page: currentPage}));
    };

    const items: MenuProps["items"] = [
        {
            key: "-rating",
            label: (
                <Space>
                    By rating (descending) <ArrowDownOutlined />
                </Space>
            ),
            onClick: () => handleSortChange("-rating"),
        },
        {
            key: "rating",
            label: (
                <Space>
                    By rating <ArrowUpOutlined />
                </Space>
            ),
            onClick: () => handleSortChange("rating"),
        },
        {
            key: "price",
            label: (
                <Space>
                    From cheap <ArrowUpOutlined />
                </Space>
            ),
            onClick: () => handleSortChange("price"),
        },
        {
            key: "-price",
            label: (
                <Space>
                    From expensive <ArrowDownOutlined />
                </Space>
            ),
            onClick: () => handleSortChange("-price"),
        },
    ];

    return (
        <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <div><SortAscendingOutlined />Sorting:</div>
            <Dropdown menu={{ items }} trigger={["click"]}>
                <Typography.Link>
                    <Space>
                        {currentSort === "rating" ? (
                            <Space>
                                By rating <ArrowUpOutlined />
                            </Space>
                        ) : currentSort === "-rating" ? (
                            <Space>
                                By rating (descending) <ArrowDownOutlined />
                            </Space>
                        ) : currentSort === "price" ? (
                            <Space>
                                From cheap <ArrowUpOutlined />
                            </Space>
                        ) : (
                            <Space>
                                From expensive <ArrowDownOutlined />
                            </Space>
                        )}
                        <DownOutlined />
                    </Space>
                </Typography.Link>
            </Dropdown>
        </div>
    );
};

export default SortHotels;
