
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-signigyx-primary to-signigyx-secondary bg-clip-text text-transparent">signigyX</h3>
            <p className="text-sm text-gray-500">
              Sign language detection made accessible for everyone. Breaking communication barriers through technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/learn" className="hover:text-signigyx-primary transition-colors">
                  Learning Guide
                </Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-signigyx-primary transition-colors">
                  Practice Area
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-signigyx-primary transition-colors">
                  Sign Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-500">
              Questions or feedback? Reach out to us at{" "}
              <a
                href="mailto:contact@signigyx.com"
                className="text-signigyx-primary hover:underline"
              >
                contact@signigyx.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} signigyX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
