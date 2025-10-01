import Link from "next/link";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full p-4 bg-gray-200 text-center">
            <p className="text-sm text-gray-600">&copy; 2025 <Link href={"https://jaydip-next-js-portfolio.vercel.app/"}> Jaydip Changani.</Link> All rights reserved.</p>
        </footer>
    );
}