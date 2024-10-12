document.addEventListener('DOMContentLoaded', function () {
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleSidebarBtn.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
        if (sidebar.classList.contains('hidden')) {
            toggleSidebarBtn.textContent = 'Show Sidebar';
            toggleSidebarBtn.classList.add('hidden');
            mainContent.style.marginRight = '20px'; // 侧栏隐藏时，文章内容占据更多空间
        } else {
            toggleSidebarBtn.textContent = 'Hide Sidebar';
            toggleSidebarBtn.classList.remove('hidden');
            mainContent.style.marginRight = '300px'; // 为侧栏留出适当空间
        }
    });
});
