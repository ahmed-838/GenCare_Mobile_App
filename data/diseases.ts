interface Disease {
    id: number;
    name: string;
    date: string;
    summary: string;
    image: any;
    details: string;
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
- Individuals with symptoms should seek specialist help if they experience unusual symptoms like persistent headaches or balance problems.`
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
The outcome depends on the severity of the condition. Some individuals may lead independent lives with therapy, while others may need lifelong support for mobility and daily activities.`
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
- Severe cases may require lifelong care and face significant neurological challenges`
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
Outcomes depend on the size and location of the encephalocele and how much of the brain is affected. With early treatment, children can lead relatively normal lives, though some may have lifelong developmental or neurological challenges.`
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
Mild ventriculomegaly is often not a cause for concern, and with proper monitoring, pregnancies proceed normally. Developmental outcomes are typically positive when the condition resolves on its own or occurs in isolation.`
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
- Further imaging like MRI for clearer brain and ventricle view
- Genetic testing (amniocentesis or CVS) to check for chromosomal abnormalities

Treatment:
- Surgery (shunt insertion) may be needed for hydrocephalus cases
- Specialized care and developmental support for genetic disorders
- Regular monitoring through follow-up imaging if no major abnormalities present

Prognosis:
The outcome depends on the underlying cause. Some children may develop normally, while others might face cognitive or physical delays. Early detection, close monitoring, and timely intervention can significantly improve the prognosis.

Expecting parents should work closely with their healthcare provider to understand the condition and its implications. Regular follow-ups and additional testing are essential to monitor the baby's development and health.`
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
Varies by severity; supportive therapies improve quality of life, but no cure exists.`
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
- Severe cases depend on underlying causes and associated conditions`
    }
];