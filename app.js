// Firebase SDK import (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs, getDoc, doc,
    updateDoc, deleteDoc, query, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Firebase 콘솔에서 프로젝트 생성 후 아래 설정을 본인의 값으로 바꾸세요.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0ErPpNNPkFrc_FilZEOfgFRPsFdhLhNo",
    authDomain: "robot-sw-web.firebaseapp.com",
    projectId: "robot-sw-web",
    storageBucket: "robot-sw-web.firebasestorage.app",
    messagingSenderId: "230274548851",
    appId: "1:230274548851:web:ee2fd8f8af7c588ccd1606",
    measurementId: "G-5L57RY04QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// State
let currentPostId = null;

// UI Elements
const postList = document.getElementById('post-list');
const writeModal = document.getElementById('write-modal');
const boardContainer = document.getElementById('board-container');
const postDetail = document.getElementById('post-detail');

// Open/Close Modal
window.openModal = (postId = null) => {
    currentPostId = postId;
    document.getElementById('modal-title').innerText = postId ? "글 수정하기" : "새 글 작성";
    if (postId) {
        // 수정 모드인 경우 데이터 로드 (실제 구현 시 detail에서 넘어오거나 다시 fetch)
    } else {
        document.getElementById('post-title').value = '';
        document.getElementById('post-author').value = '';
        document.getElementById('post-content').value = '';
    }
    writeModal.style.display = 'flex';
};

window.closeModal = () => {
    writeModal.style.display = 'none';
};

// Save Post (Create / Update)
window.savePost = async () => {
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const content = document.getElementById('post-content').value;

    if (!title || !author || !content) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    try {
        if (currentPostId) {
            // Update
            await updateDoc(doc(db, "posts", currentPostId), {
                title, author, content
            });
        } else {
            // Create
            await addDoc(collection(db, "posts"), {
                title,
                author,
                content,
                createdAt: serverTimestamp()
            });
        }
        closeModal();
    } catch (e) {
        console.error("Error adding/updating document: ", e);
        alert("파이어베이스 설정이 올바르지 않습니다. 가이드를 확인하세요.");
    }
};

// Load Posts (Real-time Snapshot)
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
            const date = data.createdAt?.toDate().toLocaleDateString() || "방금 전";
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

// Show Post Detail
async function showDetail(id) {
    currentPostId = id;
    const docSnap = await getDoc(doc(db, "posts", id));
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('detail-title').innerText = data.title;
        document.getElementById('detail-content').innerText = data.content;
        document.getElementById('detail-author').innerText = data.author;
        document.getElementById('detail-date').innerText = data.createdAt?.toDate().toLocaleString() || "";

        boardContainer.style.display = 'none';
        postDetail.style.display = 'block';

        // Set buttons
        document.getElementById('delete-btn').onclick = () => deletePost(id);
        document.getElementById('edit-btn').onclick = () => {
            openModal(id);
            document.getElementById('post-title').value = data.title;
            document.getElementById('post-author').value = data.author;
            document.getElementById('post-content').value = data.content;
        };

        loadComments(id);
    }
}

window.backToList = () => {
    boardContainer.style.display = 'block';
    postDetail.style.display = 'none';
};

// Delete Post
async function deletePost(id) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        await deleteDoc(doc(db, "posts", id));
        backToList();
    }
}

// Comments Logic
window.addComment = async () => {
    const input = document.getElementById('comment-input');
    if (!input.value) return;

    await addDoc(collection(db, `posts/${currentPostId}/comments`), {
        text: input.value,
        createdAt: serverTimestamp()
    });
    input.value = '';
};

function loadComments(postId) {
    const q = query(collection(db, `posts/${postId}/comments`), orderBy("createdAt", "asc"));
    onSnapshot(q, (snapshot) => {
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `
                <div class="comment-meta">${data.createdAt?.toDate().toLocaleString() || "방금 전"}</div>
                <div>${data.text}</div>
            `;
            commentList.appendChild(div);
        });
    });
}

// Initial Load
loadPosts();
