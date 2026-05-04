// Firebase SDK import (CDN 방식)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, getDoc, doc, 
    updateDoc, deleteDoc, query, orderBy, onSnapshot, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 사용자의 실제 Firebase 설정값 적용 완료
const firebaseConfig = {
    apiKey: "AIzaSyD0ErPpNNPkFrc_FilZEOfgFRPsFdhLhNo",
    authDomain: "robot-sw-web.firebaseapp.com",
    projectId: "robot-sw-web",
    storageBucket: "robot-sw-web.firebasestorage.app",
    messagingSenderId: "230274548851",
    appId: "1:230274548851:web:ee2fd8f8af7c588ccd1606",
    measurementId: "G-5L57RY04QB"
};

// Initialize Firebase (중복 없이 한 번만 선언)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// State
let currentPostId = null;

// UI Elements
const postList = document.getElementById('post-list');
const writeModal = document.getElementById('write-modal');
const boardContainer = document.getElementById('board-container');
const postDetail = document.getElementById('post-detail');

/**
 * 모달 제어 (window 객체에 할당)
 */
window.openModal = function(postId = null) {
    currentPostId = postId;
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = postId ? "글 수정하기" : "새 글 작성";
    
    if (!postId) {
        document.getElementById('post-title').value = '';
        document.getElementById('post-author').value = '';
        document.getElementById('post-content').value = '';
    }
    writeModal.style.display = 'flex';
};

window.closeModal = function() {
    writeModal.style.display = 'none';
};

window.backToList = function() {
    boardContainer.style.display = 'block';
    postDetail.style.display = 'none';
    currentPostId = null;
};

/**
 * 게시글 저장
 */
window.savePost = async function() {
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const content = document.getElementById('post-content').value;

    if (!title || !author || !content) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    try {
        if (currentPostId) {
            await updateDoc(doc(db, "posts", currentPostId), {
                title, author, content
            });
        } else {
            await addDoc(collection(db, "posts"), {
                title, author, content,
                createdAt: serverTimestamp()
            });
        }
        window.closeModal();
    } catch (e) {
        console.error("Error saving document: ", e);
        alert("저장에 실패했습니다. Firebase 콘솔의 Rules 설정을 확인하세요.");
    }
};

/**
 * 게시글 목록 로드 (실시간)
 */
const loadPosts = () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        postList.innerHTML = '';
        if (snapshot.empty) {
            postList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">게시글이 없습니다.</td></tr>';
            return;
        }
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const date = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : "방금 전";
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${docSnap.id.substring(0, 5)}</td>
                <td><strong>${data.title}</strong></td>
                <td>${data.author}</td>
                <td>${date}</td>
            `;
            tr.onclick = () => showDetail(docSnap.id);
            postList.appendChild(tr);
        });
    });
};

/**
 * 상세보기
 */
async function showDetail(id) {
    currentPostId = id;
    const docSnap = await getDoc(doc(db, "posts", id));
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('detail-title').innerText = data.title;
        document.getElementById('detail-content').innerText = data.content;
        document.getElementById('detail-author').innerText = data.author;
        document.getElementById('detail-date').innerText = data.createdAt ? data.createdAt.toDate().toLocaleString() : "";
        
        boardContainer.style.display = 'none';
        postDetail.style.display = 'block';

        document.getElementById('delete-btn').onclick = () => deletePost(id);
        document.getElementById('edit-btn').onclick = () => {
            window.openModal(id);
            document.getElementById('post-title').value = data.title;
            document.getElementById('post-author').value = data.author;
            document.getElementById('post-content').value = data.content;
        };

        loadComments(id);
    }
}

/**
 * 삭제
 */
async function deletePost(id) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        await deleteDoc(doc(db, "posts", id));
        window.backToList();
    }
}

/**
 * 댓글 추가
 */
window.addComment = async function() {
    const input = document.getElementById('comment-input');
    if (!input.value || !currentPostId) return;

    await addDoc(collection(db, `posts/${currentPostId}/comments`), {
        text: input.value,
        createdAt: serverTimestamp()
    });
    input.value = '';
};

/**
 * 댓글 로드
 */
function loadComments(postId) {
    const q = query(collection(db, `posts/${postId}/comments`), orderBy("createdAt", "asc"));
    onSnapshot(q, (snapshot) => {
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'comment';
            const date = data.createdAt ? data.createdAt.toDate().toLocaleString() : "방금 전";
            div.innerHTML = `
                <div class="comment-meta">${date}</div>
                <div>${data.text}</div>
            `;
            commentList.appendChild(div);
        });
    });
}

// 초기 호출 실행
loadPosts();
