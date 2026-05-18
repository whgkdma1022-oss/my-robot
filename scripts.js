// Firebase Configuration (Replace with your own keys)
const firebaseConfig = {
    apiKey: "AIzaSyBo106wOIYIWzmzcdnkUnMpibonrr652hY",
    authDomain: "robolease-global.firebaseapp.com",
    projectId: "robolease-global",
    storageBucket: "robolease-global.firebasestorage.app",
    messagingSenderId: "362274388588",
    appId: "1:362274388588:web:5042987d3bc6acfcb0b649",
    measurementId: "G-45CPJNV1RX"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
}

let currentUser = null;
let isAdmin = false;

const translations = {
    ko: {
        nav_solutions: "렌탈 솔루션",
        nav_fleet: "로봇 함대",
        nav_industries: "주요 산업",
        nav_community: "커뮤니티",
        nav_resources: "리소스",
        board_hero_title: "로보리스 커뮤니티",
        board_hero_desc: "현장 엔지니어들이 공유하는 자율 주행 로봇 점검 및 유지보수 가이드",
        board_cat1: "산업 안전",
        board_cat2: "자율 주행",
        board_cat3: "데이터 분석",
        board_cat4: "유지보수",
        board_sidebar_guide: "커뮤니티 가이드라인",
        board_sidebar_notice: "공지사항",
        btn_contact: "영업 문의",
        hero_tagline: "산업 자동화의 단순화",
        hero_title: "로봇 도입의 장벽을 <br>획기적으로 낮춥니다",
        hero_desc: "세계에서 가장 진보된 자율 주행 검사 로봇을 유연한 RaaS 모델로 만나보세요. CAPEX에서 OPEX로의 전환을 통해 오늘부터 디지털 혁신을 시작하십시오.",
        hero_btn: "로봇 라인업 확인",
        sol_tagline1: "Continuous Asset Monitoring",
        sol_title1: "루틴한 점검의 자동화",
        sol_desc1: "열화상 및 가스 누출 감지 센서를 탑재한 ANYmal이 위험 지역을 24시간 감시합니다. 인력 투입 없이도 자산의 상태를 실시간으로 확인하세요.",
        sol_feat1_1: "열화상 이상 징후 실시간 감지",
        sol_feat1_2: "자율 주행 경로 최적화",
        sol_tagline2: "3D Digital Twin Capture",
        sol_title2: "디지털 트윈으로 구현하는 현장",
        sol_desc2: "라이다(LiDAR) 스캐닝을 통해 현장의 정밀한 3D 맵을 생성합니다. 물리적 공간을 디지털로 복제하여 원격지에서도 현장 상황을 완벽히 통제하십시오.",
        sol_tagline3: "Data Driven Intelligence",
        sol_title3: "데이터에서 얻는 유지보수 지능",
        sol_desc3: "단순한 데이터 수집을 넘어, AI 분석을 통해 장비의 수명과 교체 시기를 예측합니다. 예방적 유지보수로 다운타임을 획기적으로 줄이세요.",
        solutions_title: "렌탈 패키지",
        solutions_desc: "귀사의 비즈니스 규모에 맞는 유연한 구독 모델을 선택하세요.",
        fleet_tagline: "우리의 로봇 함대",
        fleet_title: "ANYmal: 자율 주행 검사의 표준",
        fleet_desc: "열화상 카메라, 음향 센서 및 LiDAR를 장착한 ANYmal은 복잡한 환경에서 타의 추종을 불허하는 상황 인지 능력을 제공합니다.",
        fleet_li1: "3D 디지털 트윈 캡처",
        fleet_li2: "열악한 환경을 위한 IP67 등급",
        fleet_li3: "90분 연속 작동",
        fleet_li4: "자동 도킹 및 충전",
        industries_title: "주요 적용 산업",
        industries_desc: "에너지부터 화학까지, 산업 리더들이 더 똑똑하고 안전하게 운영할 수 있도록 돕습니다.",
        industries_oil_title: "석유 및 가스",
        industries_oil_desc: "위험 지역에 인력을 투입하지 않고 해상 플랜트 및 정유 시설을 안전하게 검사합니다.",
        industries_chem_title: "화학 공정",
        industries_chem_desc: "특수 방폭(ATEX) 인증 로봇 유닛을 통해 화학 공장을 상시 모니터링합니다.",
        industries_power_title: "전력 및 그리드",
        industries_power_desc: "변전소 검사를 자동화하여 정전을 방지하고 유지보수 주기를 최적화합니다.",
        contact_title: "RaaS 시작하기",
        contact_desc: "이메일 없이 간편하게 렌탈 솔루션을 문의하세요.",
        contact_first_name: "성함",
        contact_last_name: "성",
        contact_company: "회사명",
        contact_position: "직책",
        contact_phone: "전화번호",
        contact_industry_select: "산업군 선택",
        contact_msg_placeholder: "배포 국가 및 해결하려는 과제를 입력해 주세요",
        contact_btn: "렌탈 솔루션 문의하기",
        footer_desc: "산업 검사 및 모니터링을 위한 Robot-as-a-Service 솔루션의 글로벌 리더입니다.",
        footer_quick_links: "빠른 링크",
        footer_fleet: "로봇 함대",
        footer_solutions: "솔루션",
        footer_industries: "주요 산업",
        footer_case_studies: "사례 연구",
        footer_compliance: "준법 감시",
        footer_privacy: "개인정보 취급방침",
        footer_terms: "서비스 이용약관",
        footer_iso: "ISO 27001",
        footer_safety: "안전 문서",
        footer_news: "뉴스레터",
        footer_news_desc: "산업용 로봇의 최신 소식을 받아보세요.",
        footer_subscribe: "구독하기",
        footer_copyright: "&copy; 2026 RoboLease Global AG. All rights reserved.",
        footer_swiss: "Swiss Engineered. Global Excellence.",
        roi_title: "ROI 계산기",
        roi_desc: "수동 검사에서 RaaS 모델로 전환 시 절감되는 비용을 예상해 보세요.",
        roi_label_manual: "월간 수동 검사 비용 ($)",
        roi_label_hours: "월간 검사 시간",
        roi_savings_label: "RoboLease 도입 시 예상 월간 절감액",
        roi_note: "*표준 ANYmal 구독 vs 인력 비용 및 위험 완화를 기준으로 합니다.",
        case_tagline: "Success Stories",
        case_title: "글로벌 성공 사례",
        case_desc: "RoboLease Global의 전문성이 입증된 현장 사례를 확인하십시오.",
        roi_calculator_title: "간이 ROI 계산기",
        roi_calculator_desc: "사용자가 직접 로봇 도입 시의 경제적 가치를 체감할 수 있습니다.",
        roi_result_label: "RoboLease 도입 후 예상 연간 절감액",
        help_title: "고객 지원 센터 (Help Center)",
        help_desc: "자주 묻는 질문(FAQ) 검색 및 1:1 기술 지원 시스템.",
        fleet_tagline: "Engineering Excellence",
        fleet_title: "ANYmal 상세 사양",
        fleet_desc: "세계 최고 수준의 정밀도와 내구성을 자랑하는 ANYmal의 하드웨어 사양입니다.",
        process_tagline: "How It Works",
        process_title: "렌탈 서비스 프로세스",
        process_desc: "문의부터 유지보수까지, RoboLease Global은 모든 과정을 책임집니다.",
        process_step1_title: "문의 및 견적",
        process_step1_desc: "현장 상황에 맞는 최적의 로봇 모델과 수량을 제안합니다.",
        process_step2_title: "전략 및 계획",
        process_step2_desc: "자율 주행 경로와 검사 시나리오를 정밀하게 설계합니다.",
        process_step3_title: "배송 및 설치",
        process_step3_desc: "전문 엔지니어가 현장을 방문하여 로봇을 배포하고 교육을 실시합니다.",
        process_step4_title: "지원 및 유지보수",
        process_step4_desc: "24/7 원격 관제와 정기 점검을 통해 안정적인 운용을 보장합니다.",
        nav_demo: "시연 영상",
        demo_tagline: "Visual Proof",
        demo_title: "ANYmal 시연 영상",
        demo_desc: "자율 주행 로봇 ANYmal의 실전 현장 가동 영상과 기술 시연을 확인하십시오.",
        video1_title: "ANYmal 산업용 등반 시연",
        video2_title: "ANYmal 다관절 제어 및 기동",
        channel_desc: "더 많은 ANYmal의 구동 영상은 공식 채널에서 확인하실 수 있습니다.",
        motion_tagline: "ANYmal in Motion",
        motion_title: "실시간 기동 데모 모니터링",
        motion_desc: "자율 주행 로봇의 정밀한 움직임과 환경 인지 과정을 비주얼라이제이션으로 확인하십시오.",
        btn_watch_youtube: "YouTube에서 시청하기"
    },
    en: {
        nav_solutions: "Rental Solutions",
        nav_fleet: "Robot Fleet",
        nav_industries: "Industries",
        nav_community: "Community",
        nav_resources: "Resources",
        board_hero_title: "RoboLease Community",
        board_hero_desc: "Autonomous robot inspection and maintenance guides shared by field engineers",
        board_cat1: "Industrial Safety",
        board_cat2: "Autonomous",
        board_cat3: "Data Analytics",
        board_cat4: "Maintenance",
        board_sidebar_guide: "Community Guidelines",
        board_sidebar_notice: "Announcements",
        btn_contact: "Contact Sales",
        hero_tagline: "Industrial Automation Simplified",
        hero_title: "Lowering the Barrier <br>to Robot Adoption",
        hero_desc: "Access the world's most advanced autonomous inspection robots through our flexible RaaS model. Shift from CAPEX to OPEX and start your digital transformation today.",
        hero_btn: "Explore the Fleet",
        sol_tagline1: "Continuous Asset Monitoring",
        sol_title1: "Automating Routine Inspections",
        sol_desc1: "Equipped with thermal and gas sensors, ANYmal monitors hazardous areas 24/7. Gain real-time asset visibility without human risk.",
        sol_feat1_1: "Real-time thermal anomaly detection",
        sol_feat1_2: "Optimized autonomous navigation",
        sol_tagline2: "3D Digital Twin Capture",
        sol_title2: "Bringing the Field to Digital",
        sol_desc2: "Create precise 3D maps using LiDAR. Replicate physical spaces digitally to maintain full control remotely.",
        sol_tagline3: "Data Driven Intelligence",
        sol_title3: "Maintenance Intelligence from Data",
        sol_desc3: "Go beyond collection. Predict equipment life and replacement cycles using AI analysis to minimize downtime.",
        solutions_title: "Rental Packages",
        solutions_desc: "Select a flexible subscription model that fits your business scale.",
        fleet_tagline: "Engineering Excellence",
        fleet_title: "ANYmal Technical Specifications",
        fleet_desc: "Hardware specifications for ANYmal, boasting world-class precision and durability.",
        case_tagline: "Success Stories",
        case_title: "Global Success Stories",
        case_desc: "Review proven field cases where RoboLease Global expertise was demonstrated.",
        roi_calculator_title: "Simple ROI Calculator",
        roi_calculator_desc: "Experience the economic value of adopting robots first-hand.",
        roi_result_label: "Estimated Annual Savings after RoboLease",
        industries_title: "Industries We Serve",
        industries_desc: "From energy to chemicals, we help industry leaders stay safer and smarter.",
        industries_oil_title: "Oil & Gas",
        industries_oil_desc: "Safe inspection of offshore rigs and refineries without exposing human personnel to hazardous zones.",
        industries_chem_title: "Chemicals",
        industries_chem_desc: "Continuous monitoring of chemical plants with specialized ATEX-certified robotic units.",
        industries_power_title: "Power & Grid",
        industries_power_desc: "Automated substation inspections to prevent outages and optimize maintenance cycles.",
        contact_title: "Get Started with RaaS",
        contact_desc: "Contact us without an email for a simplified experience.",
        contact_first_name: "First Name",
        contact_last_name: "Last Name",
        contact_company: "Company",
        contact_position: "Position",
        contact_phone: "Phone Number",
        contact_industry_select: "Select Industry",
        contact_msg_placeholder: "Tell us about your project and target country",
        contact_btn: "Inquiry for RaaS Solution",
        footer_desc: "The global leader in Robot-as-a-Service solutions for industrial inspection and monitoring.",
        footer_quick_links: "Quick Links",
        footer_fleet: "Fleet",
        footer_solutions: "Solutions",
        footer_industries: "Industries",
        footer_case_studies: "Case Studies",
        footer_compliance: "Compliance",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        footer_iso: "ISO 27001",
        footer_safety: "Safety Docs",
        footer_news: "News",
        footer_news_desc: "Join our newsletter for the latest in industrial robotics.",
        footer_subscribe: "Subscribe",
        footer_copyright: "&copy; 2026 RoboLease Global AG. All rights reserved.",
        footer_swiss: "Swiss Engineered. Global Excellence.",
        case_tagline: "Success Stories",
        case_title: "Global Success Stories",
        case_desc: "Review proven field cases where RoboLease Global expertise was demonstrated.",
        roi_calculator_title: "Simple ROI Calculator",
        roi_calculator_desc: "Experience the economic value of adopting robots first-hand.",
        roi_result_label: "Estimated Annual Savings after RoboLease",
        help_title: "Help Center",
        help_desc: "FAQ Search and 1:1 Technical Support System.",
        process_tagline: "How It Works",
        process_title: "Rental Service Process",
        process_desc: "From inquiry to maintenance, RoboLease Global takes responsibility for every step.",
        process_step1_title: "Inquiry & Quotation",
        process_step1_desc: "We propose the optimal robot models and quantities for your site conditions.",
        process_step2_title: "Strategy & Planning",
        process_step2_desc: "We precisely design autonomous navigation paths and inspection scenarios.",
        process_step3_title: "Delivery & Installation",
        process_step3_desc: "Professional engineers visit your site to deploy robots and conduct training.",
        process_step4_title: "Support & Maintenance",
        process_step4_desc: "We ensure stable operations through 24/7 remote monitoring and regular inspections.",
        nav_demo: "Demos",
        demo_tagline: "Visual Proof",
        demo_title: "ANYmal Demo Videos",
        demo_desc: "Watch ANYmal in action across various industrial environments.",
        video1_title: "ANYmal: Precision Climbing Demo",
        video2_title: "ANYmal: Versatile Motion Control",
        channel_desc: "Visit the official YouTube channel for more videos.",
        motion_tagline: "ANYmal in Motion",
        motion_title: "Real-time Motion Demo Monitoring",
        motion_desc: "Observe the precise movements and environmental awareness of our autonomous robots.",
        btn_watch_youtube: "Watch on YouTube"
    }
};

function switchLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
}

// --- Auth & Role Logic (ID Based) ---
if (typeof firebase !== 'undefined') {
    firebase.auth().onAuthStateChanged(user => {
        const statusEl = document.getElementById('auth-status');
        const authBtn = document.getElementById('auth-btn');
        const newPostBtn = document.getElementById('btn-new-post');

        if (user) {
            currentUser = user;
            const userId = user.email.split('@')[0];
            isAdmin = userId === 'admin';
            if (statusEl) statusEl.innerText = `${userId} (${isAdmin ? 'Admin' : 'User'})`;
            if (authBtn) authBtn.innerText = 'Logout';
            if (newPostBtn) {
                newPostBtn.style.display = 'block';
                newPostBtn.onclick = () => openModal('post');
            }
        } else {
            currentUser = null;
            isAdmin = false;
            if (statusEl) statusEl.innerText = '';
            if (authBtn) authBtn.innerText = 'Login';
            if (newPostBtn) {
                newPostBtn.style.display = 'block'; // 버튼은 항상 보여줌
                newPostBtn.onclick = () => {
                    alert('로그인이 필요한 서비스입니다.');
                    openModal('login');
                };
            }
        }
        if (document.getElementById('post-list')) loadPosts();
    });
}

// Login Toggle Logic
const toggleReg = document.getElementById('toggle-reg');
if (toggleReg) {
    toggleReg.addEventListener('click', (e) => {
        e.preventDefault();
        const regFields = document.getElementById('register-fields');
        const loginTitle = document.querySelector('#login-modal h3');
        const loginBtn = document.getElementById('btn-do-login');

        if (regFields.style.display === 'none') {
            regFields.style.display = 'block';
            loginTitle.innerText = 'Sign Up';
            loginBtn.innerText = '회원가입';
            toggleReg.innerText = '로그인으로 돌아가기';
        } else {
            regFields.style.display = 'none';
            loginTitle.innerText = 'Login';
            loginBtn.innerText = '로그인';
            toggleReg.innerText = '회원가입';
        }
    });
}

const btnDoLogin = document.getElementById('btn-do-login');
if (btnDoLogin) {
    btnDoLogin.addEventListener('click', async () => {
        const userId = document.getElementById('login-id').value;
        const pw = document.getElementById('login-pw').value;
        const isRegistering = document.getElementById('register-fields').style.display === 'block';

        if (!userId || !pw) return alert('아이디와 비밀번호를 입력하세요.');
        
        // Mock email for Firebase compatibility
        const mockEmail = `${userId}@robolease.local`;

        try {
            if (isRegistering) {
                const name = document.getElementById('reg-name').value;
                const dept = document.getElementById('reg-dept').value;
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(mockEmail, pw);
                await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                    userId, name, dept, role: 'user'
                });
                alert('회원가입 성공!');
            } else {
                await firebase.auth().signInWithEmailAndPassword(mockEmail, pw);
            }
            closeModal();
        } catch (e) {
            alert('인증 실패: ' + e.message);
        }
    });
}

// --- DOM Initializers ---
document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.addEventListener('change', (e) => switchLanguage(e.target.value));

    // Mobile Menu & Scroll Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navContainer = document.getElementById('nav-container');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            menuToggle.innerText = navContainer.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    initROICalculator();
    initHelpCenter();
    switchLanguage('ko');
});

// Modal Helpers
function openModal(type) {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.style.display = 'flex';
    document.getElementById('login-modal').style.display = type === 'login' ? 'block' : 'none';
    const inqModal = document.getElementById('inquiry-modal');
    if (inqModal) inqModal.style.display = type === 'inquiry' ? 'block' : 'none';
}

function closeModal() {
    const container = document.getElementById('modal-container');
    if (container) container.style.display = 'none';
}
window.closeModal = closeModal;

// --- ROI Calculator Logic ---
function initROICalculator() {
    const staffInput = document.getElementById('roi-staff');
    const freqInput = document.getElementById('roi-freq');
    const resultEl = document.getElementById('roi-total-savings');

    if (!staffInput || !freqInput || !resultEl) return;

    function calculate() {
        const staff = parseInt(staffInput.value) || 0;
        const freq = parseInt(freqInput.value) || 0;
        const manualCost = staff * 50 * 8 * freq * 12;
        const roboCost = 30000; 
        const savings = Math.max(0, manualCost - roboCost);
        resultEl.innerText = `$${savings.toLocaleString()}`;
    }

    staffInput.addEventListener('input', calculate);
    freqInput.addEventListener('input', calculate);
    calculate();
}

// --- Help Center & FAQ Logic ---
const faqData = [
    { q: "로봇의 배터리 수명은 어떻게 되나요?", a: "ANYmal은 1회 충전으로 약 90분간 연속 가동이 가능하며, 자동 도킹 시스템을 통해 스스로 충전합니다.", tags: ["배터리", "충전", "수명"] },
    { q: "위험 지역(방폭 구역)에서도 사용 가능한가요?", a: "네, ATEX/IECEx 인증을 받은 방폭 로봇 유닛을 제공하여 화학 및 정유 시설에서도 안전하게 점검을 수행합니다.", tags: ["방폭", "석유", "가스", "안전"] },
    { q: "데이터는 어떤 방식으로 전송되나요?", a: "4G/5G 혹은 자체 Wi-Fi 망을 통해 실시간으로 클라우드 대시보드에 전송되며, 보안을 위해 종단간 암호화를 지원합니다.", tags: ["데이터", "네트워크", "보안"] },
    { q: "렌탈 기간 중 고장이 나면 어떻게 하나요?", a: "RaaS 모델에는 유지보수가 포함되어 있습니다. 고장 발생 시 48시간 이내에 대체 로봇을 배송하거나 현지 엔지니어가 방문합니다.", tags: ["유지보수", "고장", "AS", "수리"] }
];

function initHelpCenter() {
    const searchInput = document.getElementById('faq-search');
    const faqList = document.getElementById('faq-list');
    const btnOpenInquiry = document.getElementById('btn-open-inquiry');

    if (searchInput && faqList) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = faqData.filter(item => 
                item.q.toLowerCase().includes(val) || 
                item.tags.some(t => t.includes(val))
            );
            renderFAQs(filtered);
        });
        renderFAQs(faqData);
    }

    if (btnOpenInquiry) {
        btnOpenInquiry.addEventListener('click', () => {
            if (!currentUser) {
                alert('로그인이 필요한 서비스입니다.');
                openModal('login');
            } else {
                openModal('inquiry');
            }
        });
    }

    const btnSaveInquiry = document.getElementById('btn-save-inquiry');
    if (btnSaveInquiry) {
        btnSaveInquiry.addEventListener('click', async () => {
            const title = document.getElementById('inquiry-title').value;
            const content = document.getElementById('inquiry-content').value;
            if (!title || !content) return alert('제목과 내용을 입력하세요.');

            try {
                await firebase.firestore().collection('inquiries').add({
                    title, content, userId: currentUser.email.split('@')[0], uid: currentUser.uid, createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert('문의가 성공적으로 접수되었습니다. 담당 엔지니어가 곧 연락드립니다.');
                closeModal();
            } catch (e) { alert('접수 실패: ' + e.message); }
        });
    }
}

function renderFAQs(data) {
    const list = document.getElementById('faq-list');
    if (!list) return;
    list.innerHTML = data.map(item => `
        <div class="faq-item">
            <h4>Q: ${item.q}</h4>
            <p>A: ${item.a}</p>
        </div>
    `).join('');
}
