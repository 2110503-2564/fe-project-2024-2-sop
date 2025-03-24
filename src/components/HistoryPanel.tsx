'use client';

interface HistoryPanelProps {
    isLoggedIn: boolean;
}

export default function HistoryPanel({ isLoggedIn }: HistoryPanelProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium mb-4 text-center">ประวัติการลงของคุณ</h2>
            {isLoggedIn ? (
                <div className="border-t pt-4 mt-4">
                    <p className="text-center text-gray-600">ไม่มีประวัติการใช้งาน</p>
                </div>
            ) : (
                <div className="border-t pt-4 mt-4">
                    <p className="text-center mb-2">กรุณา Login ก่อนเพื่อเข้าถึง</p>
                    <p className="text-center">ประวัติของ</p>
                </div>
            )}
        </div>
    );
}