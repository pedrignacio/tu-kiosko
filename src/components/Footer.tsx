import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-16 transition-colors duration-300">
            {/* Sección principal */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna 1: About */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">🛍️ TU KIOSKO</h3>
                        <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
                            Tu tienda online de confianza. Productos de calidad 
                            para tu negocio con envío a todo Chile.
                        </p>
                        <div className="mt-4">
                            <span className="text-green-400 font-semibold">
                                ✅ Envío gratis sobre $10.000
                            </span>
                        </div>
                    </div>

                    {/* Columna 2: Links rápidos */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Enlaces rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    🏠 Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    📦 Productos
                                </Link>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    ℹ️ Acerca de nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    📧 Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Información legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#terms" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    📜 Términos y condiciones
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    🔒 Política de privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#returns" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    🔄 Cambios y devoluciones
                                </a>
                            </li>
                            <li>
                                <a href="#shipping" className="text-gray-400 dark:text-gray-300 hover:text-blue-400 transition">
                                    🚚 Política de envíos
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Contacto */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contáctanos</h4>
                        <ul className="space-y-3 text-gray-400 dark:text-gray-300 text-sm">
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <a href="tel:+56912345678" className="hover:text-blue-400 transition">
                                    +56 9 1234 5678
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <a href="mailto:contacto@tukiosko.cl" className="hover:text-blue-400 transition">
                                    contacto@tukiosko.cl
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📍</span>
                                <span>Santiago, Chile</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>🕐</span>
                                <span>Lun-Vie 9:00-18:00</span>
                            </li>
                        </ul>

                        {/* Redes sociales */}
                        <div className="mt-6">
                            <h5 className="font-semibold mb-3">Síguenos</h5>
                            <div className="flex gap-4">
                                <a 
                                    href="https://facebook.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-800 transition transform hover:scale-110"
                                >
                                    F
                                </a>
                                <a 
                                    href="https://instagram.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-pink-600 dark:bg-pink-700 rounded-full flex items-center justify-center hover:bg-pink-700 dark:hover:bg-pink-800 transition transform hover:scale-110"
                                >
                                    IG
                                </a>
                                <a 
                                    href="https://twitter.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-sky-500 dark:bg-sky-600 rounded-full flex items-center justify-center hover:bg-sky-600 dark:hover:bg-sky-700 transition transform hover:scale-110"
                                >
                                    X
                                </a>
                                <a 
                                    href="https://wa.me/56912345678" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center hover:bg-green-600 dark:hover:bg-green-700 transition transform hover:scale-110"
                                >
                                    WA
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección inferior */}
            <div className="border-t border-gray-700 dark:border-gray-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-300">
                        <p>
                            © {currentYear} TU KIOSKO. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                                alt="Visa" 
                                className="h-6 opacity-70 hover:opacity-100 transition"
                            />
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
                                alt="Mastercard" 
                                className="h-6 opacity-70 hover:opacity-100 transition"
                            />
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/3/39/WebPay_Logo.svg" 
                                alt="Webpay" 
                                className="h-6 opacity-70 hover:opacity-100 transition"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;