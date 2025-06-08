interface Disease {
    id: number;
    name: string;
    date: string;
    summary: string;
    image: any;
    details: string;
    name_ar: string;
    date_ar: string;
    summary_ar: string;
    details_ar: string;
}

export const diseases: Disease[] = [
    {
        id: 1,
        name: "Arachnoid Cyst",
        date: "Weeks 10-12",
        summary: "A fluid-filled sac that forms in the brain or spinal cord, within the arachnoid membrane surrounding the central nervous system.",
        image: require('@/assets/diseases/arachnoid_cyst.jpg'),
        details: `Arachnoid Cyst is a fluid-filled sac that usually forms in the brain or spinal cord, within the arachnoid membrane surrounding the central nervous system. Often, it is congenital (present from birth), but it can also develop due to brain injury or infection.

Symptoms:
Most arachnoid cysts are asymptomatic and are discovered incidentally. However, if the cyst is large or exerts pressure on brain tissue, it may lead to:
- Persistent headache
- Dizziness or balance issues
- Visual or hearing impairment
- Concentration difficulties or memory issues

Treatment:
- Monitoring: If the cyst does not cause symptoms, doctors may prefer regular monitoring.
- Surgical Intervention: If symptoms significantly impact the patient's quality of life, surgery may be performed to drain the cyst fluid or partially or fully remove it to relieve pressure on the brain.

Awareness:
- Early diagnosis is important, especially if symptoms appear.
- Most arachnoid cysts are benign and often harmless, though they may need regular check-ups.
- Individuals with symptoms should seek specialist help if they experience unusual symptoms like persistent headaches or balance problems.`,
        name_ar: "كيس عنكبوتي",
        date_ar: "الأسابيع 10-12",
        summary_ar: "كيس مملوء بالسوائل يتشكل في الدماغ أو الحبل الشوكي، داخل الغشاء العنكبوتي المحيط بالجهاز العصبي المركزي.",
        details_ar: `الكيس العنكبوتي هو كيس مملوء بالسوائل يتشكل عادة في الدماغ أو الحبل الشوكي، داخل الغشاء العنكبوتي المحيط بالجهاز العصبي المركزي. غالبًا ما يكون خلقيًا (موجود منذ الولادة)، ولكن يمكن أن يتطور أيضًا بسبب إصابة في الدماغ أو عدوى.

الأعراض:
معظم الأكياس العنكبوتية لا تسبب أعراضًا ويتم اكتشافها بالصدفة. ومع ذلك، إذا كان الكيس كبيرًا أو يضغط على أنسجة المخ، فقد يؤدي إلى:
- صداع مستمر
- دوار أو مشاكل في التوازن
- ضعف في الرؤية أو السمع
- صعوبات في التركيز أو مشاكل في الذاكرة

العلاج:
- المراقبة: إذا كان الكيس لا يسبب أعراضًا، قد يفضل الأطباء المراقبة المنتظمة.
- التدخل الجراحي: إذا كانت الأعراض تؤثر بشكل كبير على جودة حياة المريض، يمكن إجراء جراحة لتصريف سائل الكيس أو إزالته جزئيًا أو كليًا لتخفيف الضغط على الدماغ.

الوعي:
- التشخيص المبكر مهم، خاصة إذا ظهرت الأعراض.
- معظم الأكياس العنكبوتية حميدة وغالبًا غير ضارة، على الرغم من أنها قد تحتاج إلى فحوصات منتظمة.
- يجب على الأشخاص الذين يعانون من الأعراض طلب مساعدة متخصصة إذا واجهوا أعراضًا غير عادية مثل الصداع المستمر أو مشاكل التوازن.`
    },
    {
        id: 2,
        name: "Cerebellar Hypoplasia",
        date: "Weeks 10-12",
        summary: "A condition where the cerebellum does not develop properly, affecting coordination, balance, and motor control.",
        image: require('@/assets/diseases/arachnoid_cyst.jpg'),
        details: `Cerebellar Hypoplasia is a condition where the cerebellum (the part of the brain responsible for coordination, balance, and motor control) does not develop properly. It can be congenital (present at birth) or acquired (due to brain damage after birth).

Causes:
- Congenital: Genetic disorders, prenatal infections (e.g., rubella), or lack of oxygen during pregnancy
- Acquired: Brain damage due to lack of oxygen at birth, trauma, or infections like meningitis

Symptoms:
- Coordination issues (ataxia), difficulty walking, and muscle weakness
- Speech problems (slurred speech)
- Balance difficulties and possible seizures
- Cognitive delays or developmental problems in some cases

Diagnosis:
- MRI scans to visualize the cerebellum and assess its development
- Genetic testing to identify underlying genetic causes
- Neurological exams to assess coordination and motor function

Treatment:
- Physical Therapy to improve coordination, balance, and strength
- Occupational Therapy to help with daily tasks
- Speech Therapy if speech is affected
- Medications to manage symptoms like muscle spasms or seizures
- Surgical interventions are rare but may be needed for certain complications

Prevention:
- Good prenatal care to monitor fetal development
- Vaccinations (e.g., rubella) before pregnancy to avoid infections
- Genetic counseling for families with a history of genetic disorders

Prognosis:
The outcome depends on the severity of the condition. Some individuals may lead independent lives with therapy, while others may need lifelong support for mobility and daily activities.`,
        name_ar: "نقص نمو المخيخ",
        date_ar: "الأسابيع 10-12",
        summary_ar: "حالة لا يتطور فيها المخيخ بشكل صحيح، مما يؤثر على التناسق والتوازن والتحكم الحركي.",
        details_ar: `نقص نمو المخيخ هو حالة لا يتطور فيها المخيخ (الجزء من الدماغ المسؤول عن التناسق والتوازن والتحكم الحركي) بشكل صحيح. يمكن أن تكون خلقية (موجودة عند الولادة) أو مكتسبة (بسبب تلف الدماغ بعد الولادة).

الأسباب:
- خلقية: اضطرابات وراثية، عدوى ما قبل الولادة (مثل الحصبة الألمانية)، أو نقص الأكسجين أثناء الحمل
- مكتسبة: تلف الدماغ بسبب نقص الأكسجين عند الولادة، الصدمات، أو العدوى مثل التهاب السحايا

الأعراض:
- مشاكل في التناسق (الترنح)، صعوبة في المشي، وضعف العضلات
- مشاكل في النطق (كلام متداخل)
- صعوبات في التوازن ونوبات صرع محتملة
- تأخر إدراكي أو مشاكل في النمو في بعض الحالات

التشخيص:
- فحوصات التصوير بالرنين المغناطيسي لتصور المخيخ وتقييم تطوره
- الاختبارات الجينية لتحديد الأسباب الوراثية الكامنة
- فحوصات عصبية لتقييم التناسق والوظيفة الحركية

العلاج:
- العلاج الطبيعي لتحسين التناسق والتوازن والقوة
- العلاج المهني للمساعدة في المهام اليومية
- علاج النطق إذا تأثر الكلام
- الأدوية لإدارة الأعراض مثل تشنجات العضلات أو النوبات
- التدخلات الجراحية نادرة ولكن قد تكون ضرورية لبعض المضاعفات

الوقاية:
- رعاية جيدة قبل الولادة لمراقبة نمو الجنين
- التطعيمات (مثل الحصبة الألمانية) قبل الحمل لتجنب العدوى
- الاستشارة الوراثية للعائلات التي لديها تاريخ من الاضطرابات الوراثية

التشخيص:
تعتمد النتيجة على شدة الحالة. قد يعيش بعض الأفراد حياة طبيعية مع العلاج، بينما قد يحتاج آخرون إلى دعم مدى الحياة للتنقل والأنشطة اليومية.`
    },
    {
        id: 3,
        name: "Colphocephaly",
        date: "Months 3-4",
        summary: "A rare congenital brain abnormality with enlarged occipital horns of the brain's lateral ventricles.",
        image: require('@/assets/diseases/767679ab89a64fa5285bea4d60f36dce.jpg'),
        details: `Colpocephaly is a rare congenital brain abnormality characterized by the disproportionate enlargement of the occipital horns of the brain's lateral ventricles. This occurs due to abnormal brain development, often associated with issues in the white matter.

Causes:
- Developmental Brain Abnormalities: Problems in neuronal migration during fetal development
- Associated Conditions: Corpus callosum agenesis or hypoplasia (underdevelopment or absence of the corpus callosum)
- Genetic or Environmental Factors: Chromosomal abnormalities, prenatal infections, or injuries

Symptoms:
Varies depending on severity; common symptoms include:
- Developmental delays: Slower milestones in motor and cognitive skills
- Seizures: Common in severe cases
- Intellectual disabilities: Ranging from mild to severe
- Muscle weakness: Spasticity or lack of coordination

Diagnosis:
- Imaging Studies: MRI or CT scans show enlarged occipital horns and reduced white matter
- Prenatal Ultrasound: Sometimes identifies abnormalities during pregnancy
- Genetic Testing: To investigate potential chromosomal issues

Treatment:
No cure; management focuses on symptoms:
- Physical therapy: For motor skills
- Medications: For seizures
- Special education: To address learning disabilities
- Speech therapy: For communication difficulties

Prognosis:
Varies by severity:
- Mild cases may lead relatively normal lives with support
- Severe cases may require lifelong care and face significant neurological challenges`,
        name_ar: "تضخم القرون الخلفية للبطينات",
        date_ar: "الشهور 3-4",
        summary_ar: "تشوه دماغي خلقي نادر مع تضخم القرون القذالية للبطينات الجانبية في الدماغ.",
        details_ar: `تضخم القرون الخلفية للبطينات هو تشوه دماغي خلقي نادر يتميز بالتضخم غير المتناسب للقرون القذالية في البطينات الجانبية للدماغ. يحدث هذا بسبب التطور غير الطبيعي للدماغ، وغالبًا ما يرتبط بمشاكل في المادة البيضاء.

الأسباب:
- تشوهات دماغية نمائية: مشاكل في هجرة الخلايا العصبية أثناء نمو الجنين
- حالات مرتبطة: غياب أو نقص نمو الجسم الثفني (عدم تطور أو غياب الجسم الثفني)
- عوامل وراثية أو بيئية: تشوهات كروموسومية، عدوى ما قبل الولادة، أو إصابات

الأعراض:
تختلف حسب الشدة؛ الأعراض الشائعة تشمل:
- تأخر في النمو: تأخر في المراحل الحركية والمعرفية
- نوبات صرع: شائعة في الحالات الشديدة
- إعاقات ذهنية: تتراوح من خفيفة إلى شديدة
- ضعف العضلات: تشنجات أو نقص في التنسيق

التشخيص:
- دراسات التصوير: تظهر فحوصات الرنين المغناطيسي أو الأشعة المقطعية تضخم القرون القذالية وانخفاض المادة البيضاء
- الموجات فوق الصوتية قبل الولادة: تحدد أحيانًا التشوهات خلال الحمل
- الاختبارات الجينية: للتحقيق في مشاكل كروموسومية محتملة

العلاج:
لا يوجد علاج شافٍ؛ تركز الإدارة على الأعراض:
- العلاج الطبيعي: للمهارات الحركية
- الأدوية: للنوبات
- التعليم الخاص: لمعالجة صعوبات التعلم
- علاج النطق: لصعوبات التواصل

التشخيص:
يختلف حسب الشدة:
- قد تؤدي الحالات الخفيفة إلى حياة طبيعية نسبيًا مع الدعم
- قد تتطلب الحالات الشديدة رعاية مدى الحياة وتواجه تحديات عصبية كبيرة`
    },
    {
        id: 4,
        name: "Encephalocele",
        date: "Weeks 18-24",
        summary: "A rare congenital defect where part of the brain or its surrounding tissues protrude through an opening in the skull.",
        image: require('@/assets/diseases/3rd.jpg'),
        details: `Encephalocele is a rare congenital defect where part of the brain or its surrounding tissues protrude through an opening in the skull. This occurs during fetal development, resulting in a sac or bulge containing brain tissue.

Definition:
Encephalocele is a condition where brain tissue or fluid pushes through an abnormal opening in the skull, forming a visible protrusion. The sac may be covered by skin or open, depending on the severity.

Symptoms:
- Visible bulge on the skull (usually at the front or back of the head)
- Developmental delays (motor and cognitive)
- Vision problems due to pressure on the optic nerves
- Seizures (in some cases)
- Movement or coordination issues
- Intellectual disabilities depending on the extent of brain involvement

Treatment:
- Surgical repair: The primary treatment is surgery to close the skull defect and return brain tissue to its proper position. This may involve reconstructing part of the skull
- Supportive care: Post-surgery, children may need physical, occupational, and speech therapy to help with development
- Long-term follow-up: Ongoing monitoring for any neurological or developmental issues is necessary

Prevention:
- Prenatal care: Taking folic acid before and during pregnancy can help reduce the risk of neural tube defects like encephalocele
- Early diagnosis: Prenatal ultrasounds and genetic testing can detect encephalocele early, allowing for early intervention
- Postnatal care: Early diagnosis and surgery after birth improve outcomes

Prognosis:
Outcomes depend on the size and location of the encephalocele and how much of the brain is affected. With early treatment, children can lead relatively normal lives, though some may have lifelong developmental or neurological challenges.`,
        name_ar: "القيلة الدماغية",
        date_ar: "الأسابيع 18-24",
        summary_ar: "عيب خلقي نادر حيث يبرز جزء من الدماغ أو الأنسجة المحيطة به من خلال فتحة في الجمجمة.",
        details_ar: `القيلة الدماغية هي عيب خلقي نادر حيث يبرز جزء من الدماغ أو الأنسجة المحيطة به من خلال فتحة في الجمجمة. يحدث هذا أثناء نمو الجنين، مما يؤدي إلى تكوين كيس أو انتفاخ يحتوي على أنسجة دماغية.

التعريف:
القيلة الدماغية هي حالة يندفع فيها نسيج أو سائل الدماغ عبر فتحة غير طبيعية في الجمجمة، مشكلاً بروزًا مرئيًا. قد يكون الكيس مغطى بالجلد أو مفتوحًا، اعتمادًا على شدة الحالة.

الأعراض:
- انتفاخ مرئي على الجمجمة (عادةً في مقدمة أو مؤخرة الرأس)
- تأخر في النمو (الحركي والإدراكي)
- مشاكل في الرؤية بسبب الضغط على الأعصاب البصرية
- نوبات صرع (في بعض الحالات)
- مشاكل في الحركة أو التناسق
- إعاقات ذهنية تعتمد على مدى تأثر الدماغ

العلاج:
- الإصلاح الجراحي: العلاج الأساسي هو الجراحة لإغلاق عيب الجمجمة وإعادة نسيج الدماغ إلى موضعه الصحيح. قد يشمل ذلك إعادة بناء جزء من الجمجمة
- الرعاية الداعمة: بعد الجراحة، قد يحتاج الأطفال إلى العلاج الطبيعي والمهني وعلاج النطق للمساعدة في النمو
- المتابعة طويلة الأمد: مراقبة مستمرة لأي مشاكل عصبية أو نمائية

الوقاية:
- الرعاية قبل الولادة: تناول حمض الفوليك قبل وأثناء الحمل يمكن أن يساعد في تقليل خطر عيوب الأنبوب العصبي مثل القيلة الدماغية
- التشخيص المبكر: يمكن للموجات فوق الصوتية والاختبارات الجينية قبل الولادة اكتشاف القيلة الدماغية مبكرًا، مما يتيح التدخل المبكر
- الرعاية بعد الولادة: التشخيص المبكر والجراحة بعد الولادة تحسن النتائج

التشخيص:
تعتمد النتائج على حجم وموقع القيلة الدماغية ومدى تأثر الدماغ. مع العلاج المبكر، يمكن للأطفال أن يعيشوا حياة طبيعية نسبيًا، على الرغم من أن بعضهم قد يعاني من تحديات نمائية أو عصبية مدى الحياة.`
    },
    {
        id: 5,
        name: "Mild Ventriculomegaly",
        date: "Weeks 18-24",
        summary: "A condition where brain ventricles are slightly enlarged, containing more cerebrospinal fluid than usual.",
        image: require('@/assets/diseases/Ventriculomegaly-Illustration_2021-05-04-152710.png'),
        details: `Mild Ventriculomegaly is a condition characterized by a slight enlargement of the brain's ventricles, which are fluid-filled spaces containing cerebrospinal fluid (CSF). This condition can be detected through prenatal ultrasounds or postnatally via imaging techniques like MRI or CT scans.

Causes:
- Genetic conditions: Associated with certain genetic disorders or brain abnormalities
- Developmental brain issues: May result from abnormal brain development during pregnancy
- Brain injuries or infections: Brain damage or infections can sometimes lead to ventricular enlargement
- Increased intracranial pressure: Elevated pressure within the skull can cause the ventricles to expand

When It Occurs During Pregnancy:
Mild ventriculomegaly is often detected during routine ultrasound scans in the second trimester (18th–22nd week). It is diagnosed when the ventricles measure between 10–15 millimeters. In many cases, it is a benign finding, particularly when no other abnormalities are present.

Effects and Symptoms:
- Often asymptomatic and resolves over time
- If associated with other conditions, it may cause developmental delays or neurological issues, though this is not common

Diagnosis:
- Typically identified through prenatal ultrasound
- Additional imaging (e.g., MRI) may be required to monitor progression or resolution

Treatment:
- In most cases, no treatment is necessary, only regular monitoring via follow-up ultrasounds
- If linked to an underlying condition (e.g., genetic disorder or brain abnormality), treatment targets the root cause

Prognosis:
Mild ventriculomegaly is often not a cause for concern, and with proper monitoring, pregnancies proceed normally. Developmental outcomes are typically positive when the condition resolves on its own or occurs in isolation.`,
        name_ar: "توسع البطينات الخفيف",
        date_ar: "الأسابيع 18-24",
        summary_ar: "حالة تكون فيها بطينات الدماغ متسعة قليلاً، وتحتوي على كمية أكبر من السائل النخاعي عن المعتاد.",
        details_ar: `توسع البطينات الخفيف هو حالة تتميز بتوسع طفيف في بطينات الدماغ، وهي فراغات مملوءة بالسوائل تحتوي على السائل الدماغي النخاعي. يمكن اكتشاف هذه الحالة من خلال الموجات فوق الصوتية قبل الولادة أو بعد الولادة عبر تقنيات التصوير مثل التصوير بالرنين المغناطيسي أو الأشعة المقطعية.

الأسباب:
- حالات وراثية: مرتبطة ببعض الاضطرابات الوراثية أو تشوهات الدماغ
- مشاكل تطور الدماغ: قد تنتج عن نمو غير طبيعي للدماغ أثناء الحمل
- إصابات أو عدوى الدماغ: تلف الدماغ أو العدوى يمكن أن تؤدي أحيانًا إلى توسع البطينات
- زيادة الضغط داخل الجمجمة: ارتفاع الضغط داخل الجمجمة يمكن أن يسبب توسع البطينات

متى يحدث أثناء الحمل:
غالبًا ما يتم اكتشاف توسع البطينات الخفيف خلال فحوصات الموجات فوق الصوتية الروتينية في الثلث الثاني من الحمل (الأسبوع 18-22). يتم تشخيصه عندما تقيس البطينات بين 10-15 ملليمتر. في كثير من الحالات، يكون اكتشافًا حميدًا، خاصة عندما لا توجد تشوهات أخرى.

التأثيرات والأعراض:
- غالبًا لا تظهر أعراض وتختفي مع مرور الوقت
- إذا ارتبطت بحالات أخرى، قد تسبب تأخرًا في النمو أو مشاكل عصبية، على الرغم من أن هذا ليس شائعًا

التشخيص:
- يتم تحديده عادة من خلال الموجات فوق الصوتية قبل الولادة
- تصوير إضافي مثل التصوير بالرنين المغناطيسي لرؤية أوضح للدماغ والبطينات
- الاختبارات الجينية (بزل السلى أو أخذ عينة من المشيمة) للتحقق من التشوهات الجينية

العلاج:
- العلاج الطبيعي لتحسين التناسق والتوازن والقوة
- الأدوية لإدارة الأعراض مثل تشنجات العضلات أو النوبات
- التعليم الخاص لمعالجة صعوبات التعلم
- علاج النطق لتحسين التواصل

التشخيص:
توسع البطينات الخفيف غالبًا لا يدعو للقلق، ومع المراقبة المناسبة، يستمر الحمل بشكل طبيعي. عادة ما تكون نتائج النمو إيجابية عندما تتحسن الحالة من تلقاء نفسها أو تحدث بمعزل عن مشاكل أخرى.`
    },
    {
        id: 6,
        name: "Moderate Ventriculomegaly",
        date: "Weeks 18-22",
        summary: "A condition where brain ventricles are moderately enlarged, measuring between 15-20 millimeters.",
        image: require('@/assets/diseases/WhatsApp Image 2025-01-09 at 19.20.59_2ddd5092.jpg'),
        details: `Moderate Ventriculomegaly is a condition where the brain's ventricles are enlarged more than in mild ventriculomegaly but not as severely as in more serious cases. The ventricles are fluid-filled spaces that contain cerebrospinal fluid (CSF), which helps protect and nourish the brain. Ventricular enlargement can indicate underlying issues with brain development or function.

Causes:
- Genetic disorders: Conditions like Down syndrome, Edwards syndrome, or other chromosomal abnormalities
- Brain development problems: Abnormal brain development during pregnancy, such as hydrocephalus
- Infections during pregnancy: Infections like toxoplasmosis or cytomegalovirus (CMV)
- Traumatic brain injuries: Brain damage from trauma or infection
- Obstructions in cerebrospinal fluid flow: Blockages like tumors or cysts

When It Occurs During Pregnancy:
Moderate ventriculomegaly is usually diagnosed through ultrasound scans between the 18th and 22nd weeks of pregnancy. Ventricles measuring between 15 and 20 millimeters are considered enlarged. Detailed anatomical scans often detect this condition.

Effects and Symptoms:
- During pregnancy: May not show immediate symptoms but can signal underlying brain development issues
- At birth: Effects depend on underlying cause; some children show no impact, others may have developmental delays

Diagnosis:
- Detected via prenatal ultrasound
- Further imaging (e.g., MRI) may be required to monitor progression or resolution

Treatment:
- In most cases, no treatment is necessary, only regular monitoring via follow-up ultrasounds
- If linked to an underlying condition (e.g., genetic disorder or brain abnormality), treatment targets the root cause

Prognosis:
The outcome depends on the underlying cause. Some children may develop normally, while others might face cognitive or physical delays. Early detection, close monitoring, and timely intervention can significantly improve the prognosis.

Expecting parents should work closely with their healthcare provider to understand the condition and its implications. Regular follow-ups and additional testing are essential to monitor the baby's development and health.`,
        name_ar: "توسع البطينات المتوسط",
        date_ar: "الأسابيع 18-22",
        summary_ar: "حالة تكون فيها بطينات الدماغ متوسطة التوسع، بقياس بين 15-20 مليمتر.",
        details_ar: `توسع البطينات المتوسط هو حالة تكون فيها بطينات الدماغ متوسعة أكثر مما في توسع البطينات الخفيف ولكن ليس بشدة كما في الحالات الأكثر خطورة. البطينات هي فراغات مملوءة بالسوائل تحتوي على السائل الدماغي النخاعي، الذي يساعد في حماية وتغذية الدماغ. يمكن أن يشير توسع البطينات إلى مشاكل كامنة في تطور الدماغ أو وظيفته.

الأسباب:
- الاضطرابات الوراثية: حالات مثل متلازمة داون، متلازمة إدواردز، أو غيرها من التشوهات الكروموسومية
- مشاكل في تطور الدماغ: نمو غير طبيعي للدماغ أثناء الحمل، مثل استسقاء الدماغ
- العدوى أثناء الحمل: عدوى مثل داء المقوسات أو فيروس الخلايا المضخمة (CMV)
- إصابات الدماغ الرضحية: تلف الدماغ من الصدمات أو العدوى
- انسدادات في تدفق السائل النخاعي: عوائق مثل الأورام أو الأكياس

متى يحدث أثناء الحمل:
عادة ما يتم تشخيص توسع البطينات المتوسط من خلال فحوصات الموجات فوق الصوتية بين الأسبوعين 18 و22 من الحمل. تعتبر البطينات التي تقيس بين 15 و20 مليمترًا متوسعة. غالبًا ما تكشف عمليات المسح التشريحي المفصلة عن هذه الحالة.

التأثيرات والأعراض:
- أثناء الحمل: قد لا تظهر أعراض فورية ولكن يمكن أن تشير إلى مشاكل كامنة في تطور الدماغ
- عند الولادة: تعتمد التأثيرات على السبب الكامن؛ بعض الأطفال لا يظهرون أي تأثر، والبعض الآخر قد يعاني من تأخر في النمو

التشخيص:
- يكتشف عبر الموجات فوق الصوتية قبل الولادة
- تصوير إضافي مثل التصوير بالرنين المغناطيسي لرؤية أوضح للدماغ والبطينات
- الاختبارات الجينية (بزل السلى أو أخذ عينة من المشيمة) للتحقق من التشوهات الكروموسومية

العلاج:
- قد تكون الجراحة (إدخال تحويلة) ضرورية لحالات استسقاء الدماغ
- رعاية متخصصة ودعم نمائي للاضطرابات الوراثية
- مراقبة منتظمة من خلال متابعة التصوير إذا لم تكن هناك تشوهات كبيرة

التشخيص:
تعتمد النتيجة على السبب الكامن. قد ينمو بعض الأطفال بشكل طبيعي، بينما قد يواجه البعض الآخر تأخرًا إدراكيًا أو جسديًا. يمكن أن يحسن الاكتشاف المبكر والمراقبة الدقيقة والتدخل في الوقت المناسب بشكل كبير من التشخيص.

يجب على الوالدين المنتظرين العمل بشكل وثيق مع مقدم الرعاية الصحية لفهم الحالة وآثارها. المتابعات المنتظمة والاختبارات الإضافية ضرورية لمراقبة نمو وصحة الطفل.`
    },
    {
        id: 7,
        name: "Polencephaly",
        date: "Weeks 8-24",
        summary: "A rare brain malformation characterized by abnormal cortical development and irregular brain folds.",
        image: require('@/assets/diseases/Porencephaly-1.png'),
        details: `Polencephaly is a rare brain malformation where the cortex develops abnormally, leading to small, irregular folds instead of the normal structure. This condition can cause developmental delays, seizures, intellectual disabilities, and motor issues.

Causes:
- Genetic Mutations: (e.g., TUBA1A, DCX)
- Infections During Pregnancy: (e.g., Zika virus, CMV)
- Oxygen Deprivation: during fetal development
- Toxic Exposures: during pregnancy

Symptoms:
- Developmental delays
- Seizures
- Muscle weakness or spasticity
- Cognitive and speech impairments

Diagnosis:
- MRI: for brain imaging
- Genetic Testing: to identify mutations

Treatment:
- Medications for seizures
- Physical, speech, and occupational therapy
- Supportive care for mobility and learning challenges

Prognosis:
Varies by severity; supportive therapies improve quality of life, but no cure exists.`,
        name_ar: "تشوه الدماغ متعدد الطيات",
        date_ar: "الأسابيع 8-24",
        summary_ar: "تشوه دماغي نادر يتميز بنمو غير طبيعي للقشرة الدماغية وطيات دماغية غير منتظمة.",
        details_ar: `تشوه الدماغ متعدد الطيات هو تشوه دماغي نادر تتطور فيه قشرة الدماغ بشكل غير طبيعي، مما يؤدي إلى طيات صغيرة وغير منتظمة بدلاً من البنية الطبيعية. يمكن أن تسبب هذه الحالة تأخرًا في النمو، ونوبات صرع، وإعاقات ذهنية، ومشاكل حركية.

الأسباب:
- الطفرات الجينية: (مثل TUBA1A، DCX)
- العدوى أثناء الحمل: (مثل فيروس زيكا، فيروس الخلايا المضخمة)
- نقص الأكسجين: أثناء نمو الجنين
- التعرض للسموم: أثناء الحمل

الأعراض:
- تأخر في النمو
- نوبات صرع
- ضعف العضلات أو تشنجها
- ضعف الإدراك والنطق

التشخيص:
- التصوير بالرنين المغناطيسي: لتصوير الدماغ
- الاختبارات الجينية: لتحديد الطفرات

العلاج:
- أدوية لنوبات الصرع
- العلاج الطبيعي والنطقي والمهني
- الرعاية الداعمة للتنقل وتحديات التعلم

التشخيص:
تختلف حسب الشدة؛ العلاجات الداعمة تحسن نوعية الحياة، ولكن لا يوجد علاج شافٍ.`
    },
    {
        id: 8,
        name: "Severe Ventriculomegaly",
        date: "Weeks 8-24",
        summary: "A condition where the brain's ventricles become abnormally enlarged, measuring ≥15 mm on ultrasound.",
        image: require('@/assets/diseases/ventriculmegaly.gif'),
        details: `Severe Ventriculomegaly is a condition where the brain's ventricles (fluid-filled spaces) become abnormally enlarged. It is classified as severe when the ventricles measure ≥15 mm on ultrasound.

Causes:
- Obstruction of CSF Flow: Conditions like hydrocephalus
- Brain Abnormalities: Polencephaly, neural tube defects, or brain malformations
- Infections: Congenital infections like Cytomegalovirus (CMV) or Toxoplasmosis
- Chromosomal Abnormalities: Linked to syndromes like Down or Edwards syndrome

Symptoms:
May not be apparent in utero, but postnatal symptoms can include:
- Increased head size
- Developmental delays
- Neurological impairments

Diagnosis:
- Prenatal Ultrasound: Identifies ventricle size
- MRI: Provides detailed brain imaging
- Amniocentesis: To detect infections or genetic abnormalities

Treatment:
Depends on the cause:
- Surgical Intervention: Ventriculoperitoneal (VP) shunt for hydrocephalus
- Supportive Therapies: Physical, occupational, and speech therapy

Prognosis:
Varies widely:
- Mild cases may resolve spontaneously
- Severe cases depend on underlying causes and associated conditions`,
        name_ar: "توسع البطينات الحاد",
        date_ar: "الأسابيع 8-24",
        summary_ar: "حالة تتوسع فيها بطينات الدماغ بشكل غير طبيعي، بقياس ≥15 ملم في الموجات فوق الصوتية.",
        details_ar: `توسع البطينات الحاد هو حالة تتوسع فيها بطينات الدماغ (الفراغات المملوءة بالسائل) بشكل غير طبيعي. يتم تصنيفها على أنها حادة عندما تقيس البطينات ≥15 ملم في الموجات فوق الصوتية.

الأسباب:
- انسداد تدفق السائل النخاعي: حالات مثل استسقاء الدماغ
- تشوهات الدماغ: تشوه الدماغ متعدد الطيات، عيوب الأنبوب العصبي، أو تشوهات الدماغ
- العدوى: عدوى خلقية مثل فيروس الخلايا المضخمة أو داء المقوسات
- التشوهات الكروموسومية: مرتبطة بمتلازمات مثل داون أو إدواردز

الأعراض:
قد لا تكون واضحة في الرحم، لكن الأعراض بعد الولادة يمكن أن تشمل:
- زيادة حجم الرأس
- تأخر في النمو
- اضطرابات عصبية

التشخيص:
- الموجات فوق الصوتية قبل الولادة: تحدد حجم البطينات
- التصوير بالرنين المغناطيسي: يوفر تصويرًا دقيقًا للدماغ
- بزل السلى: للكشف عن العدوى أو التشوهات الجينية

العلاج:
يعتمد على السبب:
- التدخل الجراحي: تحويلة بطينية صفاقية لاستسقاء الدماغ
- العلاجات الداعمة: العلاج الطبيعي والمهني والنطقي

التشخيص:
يختلف على نطاق واسع:
- قد تتحسن الحالات الخفيفة تلقائيًا
- تعتمد الحالات الحادة على الأسباب الكامنة والحالات المرتبطة بها`
    }
];