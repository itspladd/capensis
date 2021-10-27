import "../styles/Logo.css"

export default function Logo(props) {
  const { className, hareOnly } = props;

  const scale = props.scale || 1;
  const baseWidth = 77;
  const baseHeight = hareOnly ? 48 : 65

  const width = baseWidth * scale;
  const height = baseHeight * scale;

  return (
    <div className={className}>
      <svg
      viewBox ={`0 0 ${baseWidth} ${baseHeight}`}
      width={`${width}px`}
      height={`${height}px`}
      >
        <path
          d="m 57.361851,0.00779235 c -4.01701,0.004 -8.06578,0.19957 -11.98118,1.16335995 -4.78258,0.8796 -9.74801,1.1765 -14.25797,3.14795 -3.09877,1.19352 -6.29356,2.46094 -8.7127,4.81844 -2.7705,2.2294797 -5.60536,4.3862397 -8.32466,6.6743997 -1.40146,0.78769 -2.99375,1.2529 -4.2156301,2.33883 -2.65423,1.86781 -5.22584,4.00714 -6.91635,6.82183 -1.19926,1.11653 -1.52069,3.39482 -0.0633,4.4392 1.14,0.81447 2.47709,1.30863 3.83306,1.62628 2.01304,-0.11472 4.0149701,-0.36991 6.0275101,-0.49143 1.77655,2.23261 3.04142,4.80663 4.40433,7.29772 0.64946,1.21874 -0.25521,2.46118 -1.51411,2.6308 -1.64442,0.46517 -3.28844,-0.29321 -4.92681,-0.42153 -3.3331601,-0.54907 -7.0894401,-0.42228 -9.88205011,1.70372 -1.35316,0.52871 -0.94367,2.25694 0.42280001,2.36933 1.81457,0.30455 3.54713,1.40282 5.44632,1.02542 4.9009101,-0.12947 9.8662201,-0.034 14.6694601,-1.16597 2.42444,0.0281 4.83772,0.38118 7.26575,0.26066 5.15597,-0.0215 10.30789,0.40165 15.46354,0.25118 1.0775,-0.38501 2.03638,0.0291 2.72619,0.86285 2.2857,1.65921 5.2125,2.0065 7.95871,2.07466 2.36194,-0.10072 4.72233,-0.61928 6.85706,-1.64948 0.54924,-0.79125 1.47448,-0.83249 2.33141,-0.69274 3.00451,0.0239 6.19737,0.20899 8.95937,-1.18298 1.73172,-0.95122 3.00509,-2.71784 3.21745,-4.69904 0.4238,-2.23848 0.65319,-4.81244 -0.73532,-6.77443 -1.154,-0.73141 -2.65814,0.0563 -3.88979,0.25806 -0.7944,0.20144 -1.42317,1.18492 -1.91994,1.44538 -1.97553,-1.86041 -3.65461,-4.28702 -6.35613,-5.14173 -3.70559,-1.50739 -7.49919,-3.18272 -11.5784,-3.16668 -4.4822,-0.17203 -9.12094,0.0336 -13.32085,1.74874 -1.15076,0.53642 -1.80113,1.99815 -3.22896,1.81025 -0.98667,0.0139 -2.1518,0.48663 -2.51515,-0.74805 -1.14654,-1.4998 -2.85301,-2.52208 -4.6766,-2.96616 1.89085,-1.73694 4.5842,-1.85861 6.99555,-2.19144 3.94803,-0.27759 7.40536,-2.38347 10.79623,-4.22948 1.84268,-1.04937 3.83523,-1.79162 5.67607,-2.84334 3.18858,-1.66937 6.32016,-3.45256 9.32789,-5.42998 1.38248,-0.78013 3.01035,-0.89313 4.56019,-0.83627 0.80497,-0.005 3.14619,-0.068 2.31047,-1.3126997 -0.85229,-0.56304 -1.87789,-0.84804 -2.86493,-1.09406 -2.92585,-0.61054 -5.92423,-0.20053 -8.88318,-0.33529 -1.33872,0.33717 -0.13302,-1.40167 0.0578,-1.98966 0.96719,-1.89075 2.61018,-3.31646 4.32477,-4.51316995 0.45331,-1.25911 -1.45856,-0.79823 -2.20669,-0.89482 -0.22039,-2e-5 -0.44086,7.9e-4 -0.66118,0.001 z m -1.84718,1.52054995 c -2.07027,1.58057 -3.34944,4.00999 -3.92327,6.51519 -2.26634,0.71083 -4.65987,0.83327 -6.97211,1.3363 -3.50647,0.50854 -7.04454,1.0347697 -10.37484,2.2950497 -3.79102,1.19153 -7.28448,3.33446 -10.00061,6.24259 -0.96349,0.91609 -2.0655,1.70665 -2.84949,2.79563 0.82199,0.75625 2.3656,0.4527 3.25073,0.11744 2.36241,-1.91581 4.35696,-4.29008 7.00151,-5.84978 4.38352,-2.72918 9.52375,-3.90235 14.59819,-4.48859 3.13754,-0.5661197 6.26336,-1.2223397 9.41382,-1.7015397 2.00829,-0.0865 4.02412,0.0118 6.01563,0.28352 -1.66207,0.30713 -3.47483,0.51521 -4.76802,1.7211997 -3.39045,2.23193 -6.98134,4.14837 -10.58296,6.00746 -3.92449,1.47143 -7.21317,4.45604 -11.40713,5.22587 -2.88723,0.39207 -5.81743,0.81946 -8.51264,1.98241 -0.82909,0.65003 -2.74272,1.42207 -2.21036,2.66804 0.82435,0.54629 1.89909,0.53577 2.7622,1.04115 1.29249,0.5971 2.43576,1.58348 3.0745,2.87022 1.01644,0.71336 2.32989,0.16624 3.47565,0.28809 1.72819,-0.0996 3.53372,0.11044 5.19353,-0.45158 1.1247,-0.74386 1.86716,-2.08433 3.27201,-2.369 2.78981,-1.16397 5.86948,-0.70111 8.80272,-0.67326 3.97674,0.24988 7.59229,2.07977 11.19225,3.62042 1.73863,1.14374 3.14838,2.6984 4.5137,4.2502 0.29847,0.96488 -0.11625,2.09014 -0.73993,2.83665 -1.11832,1.33001 -2.22119,2.67487 -3.24344,4.08081 -1.38246,-1.27382 -1.87513,-3.20964 -3.23085,-4.51269 -1.913,-2.27026 -3.94119,-4.49018 -6.38898,-6.1968 -0.99529,-0.46795 -3.21539,-0.78062 -3.22995,0.79238 0.0888,1.48717 1.08473,3.05195 0.26477,4.4924 -1.21004,1.31607 -2.95718,1.96683 -4.51226,2.78964 -1.21562,0.74771 -2.59063,1.23989 -4.03129,1.24509 -3.12787,-0.0112 -6.33407,0.096 -9.3557,-0.85714 -1.48665,-0.44939 -2.87612,-1.14683 -4.23652,-1.88379 -0.83777,-0.47921 -1.79459,-0.32288 -2.67529,-0.0958 -0.6819,0.0251 -1.25028,0.58275 -0.83676,1.20625 -0.31002,1.82039 -1.99921,3.09189 -3.73103,3.44583 -4.30082,1.31904 -8.84919,0.8659 -13.2780201,0.98997 -1.26633,-0.0872 -2.39871,-0.7235 -3.61751,-1.01452 1.04829,-0.78244 2.37176,-1.63369 3.732,-1.18219 3.4993601,0.52572 7.1927501,1.30556 10.6380201,0.0811 1.18583,-0.61006 2.72924,-1.26239 2.96032,-2.7459 -0.46526,-2.52759 -2.26556,-4.47764 -3.34839,-6.73783 -0.90275,-1.44498 -1.81697,-2.8873 -2.86469,-4.23303 -1.41655,-0.22397 -2.74882,0.53257 -3.80994,1.38872 -1.5909901,0.83692 -3.3855201,-0.0286 -4.8210501,-0.79279 -1.10258,-0.47242 -0.97964,-1.92798 -0.1981,-2.63597 1.57739,-2.42276 3.53709,-4.63764 5.9903601,-6.20103 1.45991,-1.04578 2.96079,-2.0997 4.68625,-2.65728 2.23358,-1.78108 4.34572,-3.7157 6.68929,-5.35658 2.46401,-1.9284097 4.75177,-4.2598997 7.7968,-5.2545997 4.28821,-1.91026 8.87702,-3.12162 13.54568,-3.59989 3.46805,-0.5604 6.9352,-1.36469 10.46951,-1.26038 0.0996,0.0212 0.9521,-0.16887 0.41169,0.14231 z m 17.36865,33.3068697 c 0.0367,2.30536 0.3497,4.86675 -1.08692,6.85558 -1.03919,1.30947 -2.73655,2.20449 -4.43547,1.93817 -0.77409,-0.0357 -2.35655,0.006 -2.63063,-0.31995 1.44068,-0.682 1.91811,-2.3697 3.11885,-3.33132 1.65015,-1.74184 3.51339,-3.27865 5.03417,-5.14248 z m -18.65857,1.63553 c 1.89376,1.84451 3.36743,4.07325 4.60172,6.39918 1.14731,0.66685 0.28648,1.98917 -0.58412,2.41876 -1.7177,0.90563 -3.75229,0.60871 -5.54983,0.13333 -1.57252,-0.41737 -3.28366,-1.11929 -4.12892,-2.59456 -0.60015,-1.22762 -0.006,-2.8826 1.30953,-3.34283 1.45745,-0.81343 3.27245,-1.63389 3.7069,-3.41383 -0.0339,-0.51019 0.49391,0.38559 0.64472,0.39995 z"
        />
        <path
          d="m 12.329021,22.078982 c -1.53898,-0.19975 -2.9326201,0.99592 -3.4488701,2.37371 1.03832,0.74091 2.3559401,-0.0447 3.5171501,0.20167 1.10195,-0.23557 1.81943,-1.32642 2.49593,-2.09479 -0.19378,-1.02995 -1.86981,-0.23781 -2.56421,-0.48059 z"
        />
        { !hareOnly && <path
          d="m 41.320781,53.934512 c -1.40125,0.78499 -1.74836,2.50759 -2.81328,3.61549 -0.54628,0.52518 -1.12113,2.32572 -1.85898,1.1312 -0.99802,-1.0459 -1.42941,-2.52936 -2.47688,-3.51771 -1.05875,-0.45875 -2.22973,-0.60244 -3.30927,-1.01111 -1.00454,0.34948 -1.46107,1.68494 -2.24136,2.43888 -0.72305,0.77802 -1.3659,2.08327 -2.17983,2.50056 -1.28091,-0.86629 -2.00461,-2.27914 -3.01922,-3.40477 -1.53291,-0.42713 -3.13117,-0.52765 -4.71406,-0.58619 -1.23892,0.37568 -0.78236,2.05893 -1.65531,2.82457 -0.53006,0.56784 -1.25698,1.56753 -1.88229,1.65653 -1.04478,-1.21346 -1.77582,-2.71889 -3.09471,-3.67928 -1.55435,-0.14566 -3.0901001,-0.46848 -4.6527101,-0.52851 -0.95407,0.82512 -1.33418,2.16121 -2.4715,2.81253 -1.24373,0.96895 -2.76247,1.45994 -4.21143001,2.02862 -0.52278,0.89239 1.31170001,0.81997 1.89302001,1.01211 2.36823,0.30118 4.73041,-0.52072 6.74571,-1.71431 1.0553301,1.08072 1.8212801,2.49002 3.1791401,3.24085 1.97214,0.13451 4.01717,-0.0199 5.87244,-0.73258 1.0757,-0.53612 1.81234,-1.53666 2.82566,-2.1632 1.13214,0.76403 1.84709,1.96098 2.79884,2.91321 1.8464,1.09668 4.1529,0.17238 5.62525,-1.13985 0.89454,-0.36716 1.6536,-1.38208 2.27333,-1.7991 1.96495,1.67864 4.53365,2.97082 7.18297,2.61568 1.7278,-0.57505 2.8921,-2.07087 3.97931,-3.44579 1.10633,0.83674 2.06865,2.1019 3.55441,2.21905 1.94462,0.78768 4.06283,0.29677 6.08162,0.20851 0.64608,-0.41299 1.55284,-2.06258 2.1616,-0.69412 1.18284,1.41226 3.19601,1.18788 4.84478,1.18443 1.32356,-0.094 2.76166,0.29071 3.98817,-0.36572 0.93274,-0.6761 1.95892,-1.22012 2.90053,-1.8892 1.21219,1.00965 2.47732,1.96052 3.82504,2.78277 1.46934,-0.28286 3.02681,-0.0991 4.43605,-0.67576 0.0567,-1.06956 -1.55488,-1.28159 -2.13541,-2.05824 -1.44175,-1.16132 -2.76005,-2.63955 -3.21549,-4.47847 0.14008,-1.18198 -1.39882,-0.37674 -2.05677,-0.47105 -1.14293,0.0913 -2.30712,-0.0929 -3.43396,0.17663 -0.59929,2.03753 -1.93267,4.01717 -3.9945,4.77686 -0.92214,-0.59454 -1.28493,-1.90533 -1.80722,-2.87819 -0.34563,-1.29888 -1.6878,-1.39474 -2.78254,-1.63421 -1.08069,-0.2315 -2.18366,-0.4016 -3.29198,-0.36773 -0.27593,0.98221 0.72671,2.3642 -0.66327,2.90621 -0.91095,0.58095 -2.25552,1.95606 -3.08972,0.60435 -1.09768,-1.02434 -2.11666,-2.14674 -2.9248,-3.41632 -1.13714,-0.26061 -2.30091,-0.40997 -3.39498,-0.83283 -0.26022,-0.0762 -0.52479,-0.14653 -0.7964,-0.1648 z"
        />}
      </svg>
    </div>
  )
}