import _ from 'lodash';

const extractTokenFromResponse = (response) => {
  const cookiesHeader = response.headers.get('set-cookie');

  let token = null;
  let sessionCookie = null;

  if (cookiesHeader) {
    const cookies = cookiesHeader.split(',');

    // Tìm token CSRF
    const tokenMatch = cookies.find(cookie => cookie.includes('XSRF-TOKEN='));
    if (tokenMatch) {
      token = tokenMatch.split(';')[0].split('=')[1].split('%3D')[0];
    }

    // Tìm cookie session
    const sessionCookieMatch = cookies.find(cookie => cookie.includes('wwbm_session='));
    if (sessionCookieMatch) {
      sessionCookie = sessionCookieMatch.split(';')[0].split('=')[1].split('%3D')[0];
    }
  }

  return { token, sessionCookie };
};

const formatQuestion = (questionData) => {
  return {
    id: questionData.id,
    question: questionData.question,
    answers: questionData.answers.map(answer => ({
      answer: answer.answer, 
      key: answer.key
    }))
  };
};

export const getQuestion = async (questionKey) => {
  const myHeaders = new Headers({
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
  });

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const url = `https://wwbm.com/game/get-question/${questionKey}`;

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response Error Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const questionData = await response.json();
    console.log('Full Question Data:', JSON.stringify(questionData, null, 2));

    const { token, sessionCookie } = extractTokenFromResponse(response);

    // console.log('Extracted result:', { question: questionData, token, sessionCookie });
    return { question: questionData, token, sessionCookie };
  } catch (error) {
    console.error('[API] getQuestion error:', error);
    return undefined;
  }
};

export const getCorrectedAnswer = async (question, token, sessionCookie) => {
  try {
    const formattedQuestion = formatQuestion(question);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'X-XSRF-TOKEN': token,
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        'Cookie': `wwbm_session=${sessionCookie}`
      },
      body: JSON.stringify({ question: formattedQuestion }),
    };

    const url = `https://wwbm.com/game/get-answer`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response Error Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log('Response Text:', result);
    return parseInt(result, 10);
  } catch (error) {
    console.error('[API] getCorrectedAnswer error:', error);
    return -1;
  }
};

export const getHelp50 = async (question, token) => {
  try {
    const formattedQuestion = formatQuestion(question);

    const myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'X-XSRF-TOKEN': token,
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    });

    const raw = JSON.stringify({ question: formattedQuestion });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const url = `https://wwbm.com/game/get-help/h5050`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response Error Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log('Response Text:', text);

    const result = JSON.parse(text);
    console.log('[API] get Help50: ', { result });
    return result;
  } catch (error) {
    console.error('[API] getHelp50 error:', error);
    return null;
  }
};

export const getHelpHall = async (question, token) => {
  try {
    const formattedQuestion = formatQuestion(question);

    const myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'X-XSRF-TOKEN': token,
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    });

    const raw = JSON.stringify({ question: formattedQuestion });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const url = `https://wwbm.com/game/get-help/hallHelp`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response Error Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log('Response Text:', text); // Log phản hồi để kiểm tra

    // Sử dụng regex để trích xuất phần trăm
    const regex = /<div class="procent">([\d.]+) %<\/br>([A-D])<\/div>/g;
    let match;
    const percentages = [];

    while ((match = regex.exec(text)) !== null) {
      percentages.push({ label: match[2], percent: parseFloat(match[1]) });
    }

    console.log('Parsed Percentages:', percentages);

    return percentages;
  } catch (error) {
    console.error('[API] getHelpHall failed:', error);
    return null;
  }
};

export const getHelpCallFriend = async (question, token) => {
  try {
    const formattedQuestion = formatQuestion(question); // Đảm bảo câu hỏi được định dạng đúng

    const myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'X-XSRF-TOKEN': token,
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    });

    const raw = JSON.stringify({ question: formattedQuestion });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const url = `https://wwbm.com/game/get-help/call-friend`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response Error Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log('Response Text:', text); // Log phản hồi để kiểm tra

    // Sử dụng regex để trích xuất hội thoại
    const regex = /<span>Your friend says: “([^”]+)”<\/span>/;
    const match = text.match(regex);

    let friendAdvice = match ? match[1] : "No advice available.";
    // Loại bỏ dấu ngoặc đặc biệt
    friendAdvice = friendAdvice.replace(/[«»]/g, ''); // Loại bỏ dấu ngoặc kép kiểu Pháp

    console.log('Friend Advice:', friendAdvice);

    return friendAdvice;
  } catch (error) {
    console.error('[API] getHelpCallFriend failed:', error);
    return null;
  }
};