import React from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styleRule";

const gameRules = [
    {
      title: 'Cấu trúc câu hỏi',
      description: "Người chơi sẽ phải trả lời tổng cộng 15 câu hỏi để đạt được giải thưởng cao nhất là 1 tỷ đồng. Các câu hỏi được sắp xếp theo thứ tự từ dễ đến khó, và giá trị tiền thưởng tăng dần theo mỗi câu hỏi."
    },
    {
      title: 'Mốc an toàn',
      description: "Có hai mốc an toàn: mốc 5 (1 triệu đồng) và mốc 10 (22 triệu đồng). Nếu người chơi trả lời đúng câu hỏi ở mốc này, họ sẽ bảo toàn được số tiền thưởng này dù có trả lời sai ở các câu hỏi sau."
    },
    {
      title: 'Quyền trợ giúp',
      description: "Người chơi có 4 quyền trợ giúp trong suốt chương trình:",
      options: [
        "50:50: Loại bỏ 2 đáp án sai, chỉ còn lại 1 đáp án đúng và 1 đáp án sai.",
        "Gọi điện thoại cho người thân: Người chơi sẽ có 30 giây để gọi điện thoại và hỏi ý kiến của một người thân đã đăng ký trước.",
        "Hỏi ý kiến khán giả trong trường quay: Khán giả trong trường quay sẽ bình chọn cho đáp án mà họ nghĩ là đúng.",
        "Tư vấn tại chỗ: Người chơi có thể chọn một trong số các nhà tư vấn của chương trình để hỏi ý kiến về câu trả lời."
      ]
    },
    {
      title: 'Quyết định của người chơi',
      description: "Người chơi có quyền dừng lại ở bất kỳ câu hỏi nào và bảo toàn số tiền thưởng hiện tại của mình. Nếu người chơi trả lời sai, họ sẽ rơi xuống mốc an toàn gần nhất hoặc mất hết số tiền nếu chưa vượt qua mốc 5."
    },
    {
      title: 'Thời gian trả lời câu hỏi',
      description: "Không có giới hạn thời gian cho mỗi câu hỏi, nhưng người chơi cần suy nghĩ kỹ trước khi đưa ra đáp án cuối cùng."
    }
];

const RuleScreen = ({navigation}) => {

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconback} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground 
                        source={require('../../../assets/icon/back.png')}
                        style={styles.iconback}  
                    />
                </TouchableOpacity>
                <Text style={styles.Rule}>Luật chơi</Text>
            </View>
            <ScrollView style={styles.textRule}>
                {gameRules.map((item, index) => (
                <View title={index} style={styles.item}>
                    <Text style={styles.textheader}>{item.title}</Text>
                    <Text style={styles.text}>{item.description}</Text>
                        {item.options && item.options.map((option, id) => (
                        <Text title={id} style={styles.text}> - {option}</Text>
                    ))}
                </View>
                ))}
            </ScrollView>
        </View>
)};

export default RuleScreen;