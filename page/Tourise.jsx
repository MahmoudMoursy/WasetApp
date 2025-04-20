import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TextInput, Modal, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Switch } from "react-native";
import { IconButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import BottomNav from '../component/bottomNav';
import NavBar from '../component/NavBar';

const App = ({ navigation }) => {
    DetailsModal = ({ selectedPlace, handleCloseDetails })
    const places = [
        {
            id: 1,
            title: "معبد أبو سمبل",
            shortDescription: "معابد أبو سمبل المذهلة في أسوان.",
            fullDescription: "تعد معابد أبو سمبل المذهلة عبارة عن مبنيين ضخمين من الحجر الرملي يعكسان روعتهما في المياه الهادئة لبحيرة ناصر. تجنب الرحلة الطويلة من أسوان مع راحة السيارة، مما يضمن لك تجربة مريحة وسلسة مباشرة من عتبة دارك. برفقة مرشد من علماء المصريات، استكشف الحكايات الرائعة عن رمسيس الثاني، وزوجته نفرتاري، وإلهة الحب حتحور، والدور المهم لفيضان النيل في تشكيل التاريخ القديم. استمتع بالسرديات التاريخية الغنية أثناء استكشاف هذه المعابد الشهيرة. بعد الاستكشاف، سنعود إلى أسوان في وقت متأخر بعد الظهر، لاختتام يوم مليء برؤى لا مثيل لها حول عجائب مصر القديمة. دع فخامة السيارة وخبرة مرشدك ترفع مستوى رحلتك إلى معابد أبو سمبل، لتخلق ذكريات لا تُنسى لهذه المغامرة الاستثنائية.",
            price: "1,216 EGP",
            rating: 3.8,
            reviews: 31,
            phone: "010-1234-5678",
            images: [
                "https://img.freepik.com/free-photo/old-historical-abu-simbel-temple-ramesses-ii-egypt_181624-43854.jpg?ga=GA1.1.1496392416.1737637764&semt=ais_hybrid",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/412076678.jpg?k=b47dec79c040ebb3aea2fc7c39ae4ae21ec3fbbdff5ce1936ea95a31a9428e89&o=",
                "https://img.freepik.com/free-photo/old-historical-abu-simbel-temple-ramesses-ii-egypt_181624-43854.jpg?ga=GA1.1.1496392416.1737637764&semt=ais_hybrid",
            ],
            category: "جولات",
        },
        {
            id: 2,
            title: "معبد فيلة",
            shortDescription: "معبد فيلة الرائع في أسوان.",
            fullDescription: "معبد فيلة هو واحد من أبرز المعابد في أسوان، ويقع على جزيرة فيلة في نهر النيل. تم بناء المعبد لعبادة الإلهة إيزيس، ويشتهر بجماله المعماري الفريد. يمكنك الاستمتاع بجولة في المعبد والاستماع إلى القصص التاريخية التي تحيط به.",
            price: "800 EGP",
            rating: 4.2,
            reviews: 45,
            phone: "010-9876-5432",
            images: [
                "https://img.freepik.com/free-photo/closeup-engravings-walls-luxor-temple-egypt_181624-38326.jpg?ga=GA1.1.1496392416.1737637764&semt=ais_hybrid",
                "https://img.freepik.com/free-photo/closeup-shot-luxor-temple-egypt_181624-32907.jpg?ga=GA1.1.1496392416.1737637764&semt=ais_hybrid",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/179229418.jpg?k=2803dc0481a18e4990245332e023bad9f0ed55565f3633b4621065b1cbc880b5&o=",
            ],
            category: "جولات",
        },
        {
            id: 3,
            title: "معبد كوم أمبو",
            shortDescription: "معبد كوم أمبو الفريد في أسوان.",
            fullDescription: "معبد كوم أمبو هو معبد فريد من نوعه حيث أنه مخصص لعبادة إلهين، هما حورس وسوبك. يقع المعبد على ضفة النيل ويوفر إطلالة رائعة على النهر. يمكنك استكشاف المعبد والتعرف على تاريخه الغني.",
            price: "700 EGP",
            rating: 4.0,
            reviews: 38,
            phone: "010-1122-3344",
            images: [
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/304284640.jpg?k=63453befdc7230aa7bdd91b1067d54644ce801282a4f5c1bdc3a6909fed6e7ba&o=",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/304284597.jpg?k=05e0047c83a806f4b3d2b0b36f3c71192857647502714efc550839fd870dc777&o=",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/304284374.jpg?k=3b4b4f0b55294c498a54315b0e4c2ecb7f4a95d8e7b96aca6d3a6f9fc5e49a36&o=",
            ],
            category: "جولات",
        },
        {
            id: 4,
            title: "متحف النوبة",
            shortDescription: "متحف النوبة في أسوان.",
            fullDescription: "متحف النوبة هو متحف يقع في أسوان ويعرض تاريخ وثقافة النوبة. يحتوي المتحف على العديد من القطع الأثرية التي تعود إلى العصور القديمة.",
            price: "500 EGP",
            rating: 4.5,
            reviews: 50,
            phone: "010-2233-4455",
            images: [
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/127822994.jpg?k=a4c01b23e2249bf210199188ee5d762dfc81b6a2807f626ca2343f1034ea21f8&o=",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/130649439.jpg?k=90337d6b0ccf4a4eb70520f4ee6b30d172e325754ae6879bc2aab566ad21ed77&o=",
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/130751913.jpg?k=ce946ed9a42f27f26e10aa4290897bbfc7d25c7d54da2649f202eae7be41253a&o=",
            ],
            category: "متاحف وفنون وثقافة",
        },
        {
            id: 5,
            title: "رحلة اسوان الى السد العالي ومعبد فيلة والمسلة",
            shortDescription: "جولة خاصة مصممة لتمنحك نظرة حميمة على أهم المعالم في هذه المدينة القديمة...",
            fullDescription: "جولة خاصة مصممة لتمنحك نظرة حميمة على أهم المعالم في هذه المدينة القديمة. ابدأ رحلتك بزيارة السد العالي المذهل في أسوان، وهو أحد عجائب الهندسة الحديثة التي أعادت تشكيل المنطقة منذ اكتمال بنائه في عام 1960. بعد ذلك، قم بالتعمق في أسرار مصر القديمة عند المسلة غير المكتملة، حيث ستتعرف على التقنيات التي استخدمها نحاتو الحجر القدماء. اختتم مغامرتك برحلة بالقارب إلى معبد فيلة، وهو ملاذ جزيرة جميل مخصص للإلهة إيزيس. توفر كل محطة نظرة فريدة على ماضي مصر، مع تسليط الضوء على أهمية الحفاظ على هذه الكنوز الثقافية. من خلال اختيار هذه الجولة الخاصة، فأنت لا تستكشف أسوان فحسب، بل تدعم المرشدين المحليين وتساهم في اقتصاد السياحة المستدامة الذي يساعد في الحفاظ على هذه المواقع الرائعة للأجيال القادمة. استمتع بتجربة شخصية من خلال سيارة خاصة ومرشد سياحي، لضمان أن تكون رحلتك مفيدة ولا تُنسى.",
            price: "5,014 EGP",
            rating: 4.5,
            reviews: 60,
            phone: "010-2233-4455",
            images: [
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/373232168.jpg?k=1a9b5f1fe2bf61a152e1fee11df0ff2131245fe7dad96108eb279df88bed3205&o=",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/373232205.jpg?k=a17b6fd61a5860f21edbaf2c143f754bf174a4b6b89e725ee8984f9dd14b7391&o=",
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/373232266.jpg?k=debdf04456dd25eb1b36448311f023c0f40dd4b068e5cc1121e69e79b1106ccf&o=",
            ],
            category: "متاحف وفنون وثقافة",
        },
        {
            id: 6,
            title: "جولة خاصة عند غروب الشمس بالفلوكة",
            shortDescription: "استمتع بسحر أسوان من خلال رحلة على متن مركب شراعي عند غروب الشمس...",
            fullDescription: "استمتع بسحر أسوان من خلال رحلة على متن مركب شراعي عند غروب الشمس، حيث تنبض مياه النيل الهادئة بألوان الغسق النابضة بالحياة. مع انجراف القارب الشراعي المصري الأصيل بلطف، تصبح جزءًا من تقليد عمره قرون، وتستمتع بالجمال الخالد لنهر النيل بطريقة فريدة حقًا. تلقي الشمس الغاربة ضوءًا ذهبيًا، مما يخلق مسرحية ساحرة من الضوء الذي يرقص على سطح الماء. لا توفر هذه الرحلة الهادئة مناظر خلابة فحسب، بل تعزز أيضًا ارتباطًا عميقًا بالثقافة والتاريخ المحليين. كل لحظة تقضيها على متن الفلوكة تتيح لك فرصة التأمل السلمي وتقدير جمال أسوان الطبيعي. ومن خلال المشاركة في هذه التجربة، يساهم السائحون في الاقتصاد المحلي ويساعدون في الحفاظ على التراث الثقافي لهذه المنطقة الرائعة. رحلة الفلوكة عند غروب الشمس هي أكثر من مجرد جولة ذات مناظر خلابة؛ إنها فرصة لدعم مجتمع أسوان النابض بالحياة أثناء الاستمتاع بأمسية هادئة وخلابة على نهر النيلى...",
            price: "1,267 EGP",
            rating: 5,
            reviews: 52,
            phone: "010-2233-4455",
            images: [
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/373240213.jpg?k=27e9ed235cc454ebb2e70a08b0df50355ad2416dc0133d1938574f49b01cbb2b&o=",
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/373240297.jpg?k=caf647a517255ce57fc036819b44d1abdc242f52af15db4f0029a9a86317fdc5&o=",
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/373240189.jpg?k=ef226486a793efa76045fda0c7cd6e40aa0a094e15e07440a50caf1cfec2735f&o=",
            ],
            category: "طبيعة وأنشطة خارجية",
        },
        {
            id: 7,
            title: "عرض الصوت والضوء اسوان",
            shortDescription: "هل تساءلت يومًا كيف كانت الحياة منذ آلاف السنين...",
            fullDescription: "هل تساءلت يومًا كيف كانت الحياة منذ آلاف السنين؟ ستتعرف على ذلك من خلال إنشاء العروض المرئية والمؤثرات الصوتية لمعبد فيلة...",
            price: "1,267 EGP",
            rating: 5,
            reviews: 100,
            phone: "010-2233-4455",
            images: [
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/339784367.jpg?k=63e287e8c787e9643af409a467f22368e5496ea7978d10fcbd3a5e1dba57f271&o=",
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/339784420.jpg?k=1b83d3a9ca03e03c2f07017a884ce6cbd81a6c6e4a6243674a2d3917846de202&o=",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/339784626.jpg?k=3a00fb8d79cd75bcec7f58b9e326ae0e7648146579774c7dec3d5e7f80be67cd&o=",
            ],
            category: "طبيعة وأنشطة خارجية",
        },
        {
            id: 8,
            title: "جزيرة النباتات",
            shortDescription: "اغتنم الفرصة وقم بزيارة أسوان التي كانت تعرف بأرض الذهب...",
            fullDescription: "اغتنم الفرصة وقم بزيارة أسوان التي كانت تعرف بأرض الذهب حيث كانت كنزًا كبيرًا لملوك النوبة، قم بزيارة أسوان للاستمتاع بتراثها الرائع في رحلة يوم واحد يمكنك فيها زيارة (جزيرة النباتات – القرية النوبية)....",
            price: "1,625 EGP",
            rating: 5,
            reviews: 23,
            phone: "010-2233-4455",
            images: [
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/339316853.jpg?k=56fd4c84ec5a3fdc3f2a0fa9b58e5645ea60df9b8728625098773dab8c4f3c40&o=",
                "https://img.freepik.com/premium-photo/close-up-view-colorful-faluca-traditional-boat-sailing-river-sorrounded-by-vegetation_1048944-11883581.jpg?ga=GA1.1.1496392416.1737637764&semt=ais_hybrid",
                "https://image.shutterstock.com/image-photo/botanical-garden-kitcheners-island-nile-260nw-1864170793.jpg",
            ],
            category: "طبيعة وأنشطة خارجية",
        },
        {
            id: 9,
            title: "التسوق واستكشاف الأسواق في أسوان",
            shortDescription: "مغامرة تسوق ممتعة في سوق أسوان النابض بالحياة...",
            fullDescription: "مغامرة تسوق ممتعة في سوق أسوان النابض بالحياة. سيستقبلك مرشدك ذو الخبرة من فندقك أو من رحلتك النيلية ويقودك عبر السوق الصاخبة، ويكشف لك عن الجواهر المخفية. اكتشف متاجر الأعشاب العطرية المليئة بالهدايا التذكارية والزيوت الثمينة والعطور الجذابة ومنتجات العناية بالجسم الفاخرة. لا تفوت فرصة الحصول على خرطوشة شخصية منقوش عليها اسمك بالهيروغليفية القديمة، وهي هدية تذكارية فريدة من نوعها ولا تُنسى حقًا. اكتشف مجموعة متنوعة من المقشرات الطبيعية والصابون والأعشاب والروائح الساحرة لتعزيز جمالك ورفاهتك. انغمس في المشاهد والأصوات والروائح في هذا السوق النابض بالحياة، مما يخلق تجربة لا تُنسى وغنية بالحواس حقًا....",
            price: "2,523 EGP",
            rating: 5,
            reviews: 500,
            phone: "010-2233-4455",
            images: [
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/444318889.jpg?k=5892a7350f363aecac044d77b2b5c3411320ffdc620362c83e1bd69313fccdeb&o=",
                "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/444318856.jpg?k=871b7903ffd9c265666cca53cf4299fde71ae56385c1a89f6b594e2f94de691b&o=",
                "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/444318871.jpg?k=2918ef9779c4afd05d374b796d5b92e87da89742e0ef193aa62837810a4cfd9f&o=",
            ],
            category: "طبيعة وأنشطة خارجية",
        },
        {
            id: 10,
            title: "ركوب الفلوكة في النيل",
            shortDescription: "تجربة هادئة لمشاهدة غروب الشمس والمعابد من وسط النيل.",
            fullDescription: "استمتع برحلة مميزة على متن الفلوكة في نهر النيل، حيث يمكنك مشاهدة المعابد القديمة والمناظر الطبيعية الخلابة وقت الغروب، في أجواء هادئة تأخذك بعيدًا عن صخب الحياة.",
            price: "100 EGP",
            rating: 5,
            reviews: 500,
            phone: "010-2233-4455",
            images: [
                "https://img.freepik.com/premium-photo/sailboat-is-traveling-down-river_662214-415717.jpg?ga=GA1.1.1877792813.1744932180&semt=ais_hybrid&w=740",
                "https://img.freepik.com/premium-photo/flag-aswan_219958-1148.jpg?ga=GA1.1.1877792813.1744932180&semt=ais_hybrid&w=740",
                "https://img.freepik.com/premium-photo/sailboats-nile_78895-359.jpg?ga=GA1.1.1877792813.1744932180&semt=ais_hybrid&w=740",
            ],
            category: "جولات",
        },
        {
            id: 11,
            title: "بحيرة ناصر",
            shortDescripti: " أكبر بحيرة صناعية في العالم، توفر رحلات بحرية وصيد الأسماك",
            fullDescription: "حيرة ناصر هي أكبر بحيرة صناعية في العالم، تمتد على مسافة واسعة في جنوب مصر، وتعد واحدة من أبرز الوجهات السياحية. توفر البحيرة العديد من الأنشطة المثيرة مثل الرحلات البحرية الممتعة، وصيد الأسماك في مياهها العميقة، مما يجعلها وجهة مثالية لعشاق الطبيعة والأنشطة المائية. استمتع بمشاهدة المناظر الطبيعية الخلابة التي تحيط بالبحيرة، واكتشف جمالها الفريد.",
            price: "150 EGP",
            rating: 5,
            reviews: 500,
            phone: "010-2233-4455",
            images: [
                "https://img.freepik.com/free-photo/beautiful-shot-tufa-towers-mono-lake-tufa-state-natural-reserve-california_181624-19080.jpg?ga=GA1.1.1877792813.1744932180&semt=ais_hybrid&w=740",
                "https://img.freepik.com/premium-photo/scenic-view-lake-against-sky_1048944-10346495.jpg?ga=GA1.1.1877792813.1744932180&semt=ais_hybrid&w=740",
                "https://img.freepik.com/free-photo/beautiful-view-nikouria-with-wooden-dock-mountains-amorgos-island_181624-18214.jpg?ga=GA1.1.1877792813.1744932180&semt=ais_hybrid&w=740",
            ],
            category: "طبيعة وأنشطة خارجية",
        },
        {
            id: 12,
            title: "غرب سهيل",
            shortDescripti: "جزيرة نوبية رائعة في أسوان، تتميز بمناظرها الطبيعية الخلابة وثقافتها النوبية التقليدية.",
            fullDescription: "غرب سهيل هو أحد المعالم السياحية الشهيرة في أسوان، يقع على ضفاف نهر النيل. الجزيرة النوبية تتمتع بمناظر طبيعية ساحرة، مع بيوت نوبية تقليدية تبرز الثقافة المحلية. يمكن للزوار الاستمتاع بالتجول في أرجائها، واكتشاف التراث النوبي الأصلي من خلال العادات والمأكولات والحرف اليدوية المميزة.",
            price: "250 EGP",
            rating: 5,
            reviews: 500,
            phone: "010-2233-4455",
            images: [
                "https://th.bing.com/th/id/OIP.NITYEyxhx6T44j5rRO5ghQHaE8?rs=1&pid=ImgDetMain",
                "https://th.bing.com/th/id/OIP.BkOGi2Y9TDQmVNH92BX27AHaHa?pid=ImgDet&w=474&h=474&rs=1",
                "https://th.bing.com/th/id/OIP.RGjtHiM3fVF5_2bm4Lw8ggHaHa?pid=ImgDet&w=474&h=474&rs=1",
            ],
            category: "طبيعة وأنشطة خارجية",
        },
    ];
    const categories = ['جولات', 'طبيعة وأنشطة خارجية', 'متاحف وفنون وثقافة'];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleSearchChange = (text) => setSearchQuery(text);

    const handleFilterChange = (category) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((cat) => cat !== category)
                : [...prevCategories, category]
        );
    };

    const handleOpenDetails = (place) => {
        setSelectedPlace(place);
        setModalVisible(true);
    };

    const handleCloseDetails = () => {
        setModalVisible(false);
    };

    const filteredPlaces = places.filter((place) =>
        (selectedCategories.length === 0 || selectedCategories.includes(place.category)) &&
        place.title?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );

    return (
        <View style={{ flex: 1 }}>
            <NavBar navigation={navigation} />
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="ابحث عن مكان"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                />


                <View style={styles.filters}>
                    {categories.map((category) => (
                        <View key={category} style={styles.filterItem}>
                            <Switch
                                value={selectedCategories.includes(category)}
                                onValueChange={() => handleFilterChange(category)}
                            />
                            <Text>{category}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.container}>
                    {filteredPlaces.length > 0 ? (
                        <FlatList
                            data={filteredPlaces}
                            keyExtractor={(place) => place.id.toString()}
                            renderItem={({ item: place }) => (
                                <View style={styles.card}>
                                    <Image source={{ uri: place.images[0] }} style={styles.image} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.title}>{place.title}</Text>
                                        <Text style={styles.description}>{place.shortDescription}</Text>

                                        <View style={styles.infoRow}>
                                            <Text style={styles.price}>{place.price}</Text>
                                            <View style={styles.rating}>
                                                <IconButton icon="star" size={16} style={{ color: "#FFD700" }} />
                                                <Text style={styles.ratingText}>{place.rating} ({place.reviews} تقييم)</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity style={styles.button} onPress={() => handleOpenDetails(place)}>
                                            <Text style={styles.buttonText}>عرض التفاصيل</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={styles.noResults}>لا توجد نتائج مطابقة لبحثك.</Text>
                    )}
                </View>


                {selectedPlace && (
                    <Modal
                        visible={modalVisible}
                        onRequestClose={handleCloseDetails}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: "bold",
                                    color: "#091e3d",
                                    textAlign: "center",
                                    marginVertical: 10,
                                    textTransform: "capitalize",
                                }}>{selectedPlace.title}</Text>

                                <Text style={{
                                    color: "#000000FF",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    lineHeight: 20,
                                    textAlign: "center",
                                }}>{selectedPlace.fullDescription}</Text>
                                <View style={styles.infoRow}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        color: "#FFF",
                                        backgroundColor: "#D3792FFF",
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 8,
                                        textAlign: "center",
                                        marginRight: 20,

                                    }}>{selectedPlace.price}</Text>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        backgroundColor: "#F0EDEDFF",
                                        paddingVertical: 8,
                                        paddingHorizontal: 12,
                                        borderRadius: 8,
                                        alignSelf: "flex-start",
                                    }}>
                                        <MaterialIcons name="phone" size={20} color="#2E7D32" />
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "#2E7D32",
                                            backgroundColor: "#F0EDEDFF",
                                            paddingHorizontal: 10,
                                            paddingVertical: 1,
                                            borderRadius: 8,
                                            textAlign: "center",
                                        }}>{selectedPlace.phone}</Text>
                                    </View>

                                </View>

                                <TouchableOpacity style={{
                                    marginTop: 12,
                                    backgroundColor: "#D32F2F",
                                    paddingVertical: 12,
                                    paddingHorizontal: 20,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 5,
                                    elevation: 4,
                                }} onPress={handleCloseDetails}>
                                    <Text style={{
                                        color: "#FFF",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        textTransform: "uppercase"
                                    }}>إغلاق</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                )}
            </ScrollView>
            <BottomNav navigation={navigation} />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: "#f4f4f4",
        marginBottom: 50
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },


    searchInput: {
        height: 45,
        borderColor: "#aaa",
        borderWidth: 1.5,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 2,
    },
    filters: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginBottom: 16,
    },
    filterItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
        padding: 8,
        borderRadius: 5,
        // backgroundColor: "#eee",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 10,
        width: "85%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
        width: "100%",
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
        marginRight: 14,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginVertical: 6,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#091e3d",
        backgroundColor: "#ddd",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 5,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#091e3d",
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    noResults: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
        color: "#777",
    },
});




export default App;