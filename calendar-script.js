// Calendar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const eventModal = document.getElementById('event-modal');
    const eventModalTitle = document.getElementById('event-modal-title');
    const eventDate = document.getElementById('event-date');
    const eventDescription = document.getElementById('event-description');
    const eventModalClose = document.getElementById('event-modal-close');
    const eventModalOverlay = document.getElementById('event-modal-overlay');

    // Comprehensive US holidays, national days, and awareness days for 2025
    const calendarEvents = {
        '2025-01-01': {
            title: 'New Year\'s Day',
            description: 'Start the year with fresh fencing projects! Perfect time for "New Year, New Fence" campaigns.'
        },
        '2025-01-15': {
            title: 'National Hat Day',
            description: 'Fun day to showcase your team\'s personality and professionalism.'
        },
        '2025-01-20': {
            title: 'National Cheese Lover\'s Day',
            description: 'Light-hearted content opportunity for social media engagement.'
        },
        '2025-01-25': {
            title: 'National Opposite Day',
            description: 'Creative content opportunity with reverse messaging.'
        },
        '2025-02-02': {
            title: 'Groundhog Day',
            description: 'Spring is coming! Perfect timing for seasonal fence maintenance campaigns.'
        },
        '2025-02-09': {
            title: 'National Pizza Day',
            description: 'Team appreciation and community connection content.'
        },
        '2025-02-14': {
            title: 'Valentine\'s Day',
            description: 'Love your property? Protect it with quality fencing!'
        },
        '2025-02-17': {
            title: 'Presidents\' Day',
            description: 'Honor leadership and celebrate American craftsmanship.'
        },
        '2025-02-20': {
            title: 'National Love Your Pet Day',
            description: 'Pet-friendly fencing solutions and backyard safety.'
        },
        '2025-03-01': {
            title: 'National Peanut Butter Lover\'s Day',
            description: 'Fun, light content for social media engagement.'
        },
        '2025-03-08': {
            title: 'International Women\'s Day',
            description: 'Celebrate women in construction and business leadership.'
        },
        '2025-03-14': {
            title: 'National Pi Day',
            description: 'Fun mathematical content and team appreciation.'
        },
        '2025-03-17': {
            title: 'St. Patrick\'s Day',
            description: 'Green-themed content perfect for spring fence installations.'
        },
        '2025-03-20': {
            title: 'First Day of Spring',
            description: 'Spring cleaning and fence maintenance season begins!'
        },
        '2025-04-01': {
            title: 'April Fools\' Day',
            description: 'Light-hearted content opportunity with fence-related humor.'
        },
        '2025-04-07': {
            title: 'National Beer Day',
            description: 'Team celebration and community connection content.'
        },
        '2025-04-15': {
            title: 'Tax Day',
            description: 'Home improvement tax deduction information.'
        },
        '2025-04-22': {
            title: 'Earth Day',
            description: 'Eco-friendly fencing materials and sustainable practices.'
        },
        '2025-04-25': {
            title: 'National DNA Day',
            description: 'Science and innovation in construction materials.'
        },
        '2025-05-01': {
            title: 'May Day',
            description: 'Spring renewal and fresh start messaging.'
        },
        '2025-05-05': {
            title: 'Cinco de Mayo',
            description: 'Celebrate diversity and community connections.'
        },
        '2025-05-11': {
            title: 'Mother\'s Day',
            description: 'Perfect for family safety and home protection messaging.'
        },
        '2025-05-18': {
            title: 'National Museum Day',
            description: 'Community involvement and local business support.'
        },
        '2025-05-26': {
            title: 'Memorial Day',
            description: 'Honor veterans and celebrate American values.'
        },
        '2025-06-01': {
            title: 'National Say Something Nice Day',
            description: 'Customer appreciation and positive community messaging.'
        },
        '2025-06-14': {
            title: 'Flag Day',
            description: 'Patriotic content and American craftsmanship celebration.'
        },
        '2025-06-15': {
            title: 'Father\'s Day',
            description: 'Dad\'s DIY projects and home improvement gifts.'
        },
        '2025-06-21': {
            title: 'First Day of Summer',
            description: 'Summer installation season and outdoor living spaces.'
        },
        '2025-06-30': {
            title: 'National Social Media Day',
            description: 'Digital marketing and online presence celebration.'
        },
        '2025-07-01': {
            title: 'National Postal Worker Day',
            description: 'Community service appreciation and local business support.'
        },
        '2025-07-04': {
            title: 'Independence Day',
            description: 'Celebrate freedom and American independence.'
        },
        '2025-07-20': {
            title: 'National Moon Day',
            description: 'Innovation and reaching for the stars in business.'
        },
        '2025-07-30': {
            title: 'National Cheesecake Day',
            description: 'Team appreciation and sweet success celebrations.'
        },
        '2025-08-01': {
            title: 'National Girlfriends Day',
            description: 'Community connection and friendship appreciation.'
        },
        '2025-08-09': {
            title: 'National Book Lover\'s Day',
            description: 'Education and continuous learning in business.'
        },
        '2025-08-15': {
            title: 'National Relaxation Day',
            description: 'Backyard privacy and relaxation space creation.'
        },
        '2025-08-26': {
            title: 'National Dog Day',
            description: 'Pet safety and family protection messaging.'
        },
        '2025-09-01': {
            title: 'Labor Day',
            description: 'Celebrate hard work and craftsmanship.'
        },
        '2025-09-11': {
            title: 'Patriot Day',
            description: 'Security and protection messaging.'
        },
        '2025-09-19': {
            title: 'National Talk Like a Pirate Day',
            description: 'Fun team content and creative communication.'
        },
        '2025-09-22': {
            title: 'First Day of Fall',
            description: 'Fall maintenance and preparation for winter.'
        },
        '2025-09-29': {
            title: 'National Coffee Day',
            description: 'Team energy and morning motivation content.'
        },
        '2025-10-08': {
            title: 'National Fluffernutter Day',
            description: 'Light-hearted team bonding content.'
        },
        '2025-10-15': {
            title: 'National Grouch Day',
            description: 'Humor and personality in business communication.'
        },
        '2025-10-22': {
            title: 'National Nut Day',
            description: 'Healthy choices and team wellness content.'
        },
        '2025-10-31': {
            title: 'Halloween',
            description: 'Spooky fence decorations and safety tips.'
        },
        '2025-11-01': {
            title: 'National Author\'s Day',
            description: 'Storytelling and business narrative content.'
        },
        '2025-11-11': {
            title: 'Veterans Day',
            description: 'Honor veterans and military families.'
        },
        '2025-11-15': {
            title: 'National Clean Out Your Refrigerator Day',
            description: 'Organization and fresh start messaging.'
        },
        '2025-11-21': {
            title: 'National Gingerbread Cookie Day',
            description: 'Holiday preparation and sweet celebrations.'
        },
        '2025-11-27': {
            title: 'Thanksgiving',
            description: 'Gratitude and family gathering content.'
        },
        '2025-12-08': {
            title: 'National Brownie Day',
            description: 'Sweet treats and holiday cheer content.'
        },
        '2025-12-15': {
            title: 'National Cupcake Day',
            description: 'Holiday celebrations and team appreciation.'
        },
        '2025-12-21': {
            title: 'First Day of Winter',
            description: 'Winter preparation and seasonal maintenance tips.'
        },
        '2025-12-25': {
            title: 'Christmas',
            description: 'Holiday decorations and winter fence maintenance.'
        },
        '2025-12-31': {
            title: 'New Year\'s Eve',
            description: 'Year-end reflection and new year planning.'
        }
    };

    // Month names and icons
    const months = [
        { name: 'January', icon: '❄️', days: 31 },
        { name: 'February', icon: '💝', days: 28 },
        { name: 'March', icon: '🌸', days: 31 },
        { name: 'April', icon: '🌷', days: 30 },
        { name: 'May', icon: '🌻', days: 31 },
        { name: 'June', icon: '☀️', days: 30 },
        { name: 'July', icon: '🇺🇸', days: 31 },
        { name: 'August', icon: '🌞', days: 31 },
        { name: 'September', icon: '🍂', days: 30 },
        { name: 'October', icon: '🎃', days: 31 },
        { name: 'November', icon: '🦃', days: 30 },
        { name: 'December', icon: '🎄', days: 31 }
    ];

    // Generate calendar
    function generateCalendar() {
        calendarGrid.innerHTML = '';
        
        months.forEach((month, monthIndex) => {
            const monthCard = createMonthCard(month, monthIndex);
            calendarGrid.appendChild(monthCard);
        });
    }

    function createMonthCard(month, monthIndex) {
        const card = document.createElement('div');
        card.className = 'month-card';
        
        const today = new Date();
        const currentYear = 2025;
        const firstDay = new Date(currentYear, monthIndex, 1);
        const lastDay = new Date(currentYear, monthIndex + 1, 0);
        const startDate = firstDay.getDay();
        
        card.innerHTML = `
            <div class="month-header">
                <h3 class="month-title">
                    <span class="month-icon">${month.icon}</span>
                    ${month.name}
                </h3>
                <span class="month-year">${currentYear}</span>
            </div>
            <div class="days-grid">
                <div class="day-header">Sun</div>
                <div class="day-header">Mon</div>
                <div class="day-header">Tue</div>
                <div class="day-header">Wed</div>
                <div class="day-header">Thu</div>
                <div class="day-header">Fri</div>
                <div class="day-header">Sat</div>
                ${generateDays(startDate, month.days, monthIndex)}
            </div>
        `;
        
        return card;
    }

    function generateDays(startDate, daysInMonth, monthIndex) {
        let daysHTML = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startDate; i++) {
            daysHTML += `<div class="day-cell other-month"></div>`;
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `2025-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = calendarEvents[dateString];
            const isToday = isCurrentDay(monthIndex, day);
            
            let dayClass = 'day-cell';
            if (hasEvent) dayClass += ' has-event';
            if (isToday) dayClass += ' today';
            
            daysHTML += `<div class="${dayClass}" data-date="${dateString}" data-day="${day}">${day}</div>`;
        }
        
        return daysHTML;
    }

    function isCurrentDay(monthIndex, day) {
        const today = new Date();
        return today.getFullYear() === 2025 && 
               today.getMonth() === monthIndex && 
               today.getDate() === day;
    }

    // Event handling
    function setupEventListeners() {
        // Day click events
        calendarGrid.addEventListener('click', function(e) {
            const dayCell = e.target.closest('.day-cell');
            if (dayCell && !dayCell.classList.contains('other-month')) {
                const dateString = dayCell.dataset.date;
                const event = calendarEvents[dateString];
                
                if (event) {
                    showEventModal(event, dateString);
                }
            }
        });

        // Modal close events
        eventModalClose.addEventListener('click', closeEventModal);
        eventModalOverlay.addEventListener('click', closeEventModal);
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && eventModal.classList.contains('active')) {
                closeEventModal();
            }
        });
    }

    function showEventModal(event, dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        eventModalTitle.textContent = event.title;
        eventDate.textContent = formattedDate;
        eventDescription.textContent = event.description;

        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeEventModal() {
        eventModal.classList.remove('active');
        document.body.style.overflow = '';
    }


    // Initialize calendar
    generateCalendar();
    setupEventListeners();
});
