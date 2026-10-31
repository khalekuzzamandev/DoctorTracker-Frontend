
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Stethoscope,
  Users,
  CalendarCheck,
} from "lucide-react";

const Hero = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Animated Background Decorations */}
      <motion.div
        animate={
          reduceMotion
            ? {}
            : { x: [0, 35, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl"
      />

      <motion.div
        animate={
          reduceMotion
            ? {}
            : { x: [0, -30, 0], y: [0, -25, 0], scale: [1, 1.2, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-10 -left-20 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"
      />

      {/* Main Container */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-24 lg:px-8">

        {/* Left Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-7"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm backdrop-blur-md"
          >
            <motion.span
              animate={reduceMotion ? {} : { rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Activity size={17} />
            </motion.span>
            Smart Healthcare Management
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Manage Doctors,
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="block bg-gradient-to-r from-sky-500 via-blue-600 to-blue-800 bg-clip-text text-transparent"
            >
              Simplify Healthcare.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            DoctorTraker helps you manage doctors, organize patient
            information, and streamline healthcare administration
            with one powerful and easy-to-use platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={reduceMotion ? {} : { y: -5, scale: 1.04 }}
              whileTap={reduceMotion ? {} : { scale: 0.96 }}
              className="group flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
            >
              Get Started
              <motion.span
                animate={reduceMotion ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={19} />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={reduceMotion ? {} : { y: -5, scale: 1.04 }}
              whileTap={reduceMotion ? {} : { scale: 0.96 }}
              className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600"
            >
              Explore Features
            </motion.button>
          </motion.div>

          {/* Trust Features */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-7 sm:grid-cols-3"
          >
            {[
              { icon: ShieldCheck, label: "Secure System" },
              { icon: Users, label: "Easy Management" },
              { icon: CalendarCheck, label: "Organized Records" },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={reduceMotion ? {} : { x: 5 }}
                  className="flex items-center gap-2"
                >
                  <Icon className="shrink-0 text-blue-600" size={22} />
                  <span className="text-sm font-medium text-slate-600">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 70, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Image Glow */}
          <motion.div
            animate={reduceMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-8 rounded-full bg-blue-400/30 blur-3xl"
          />

          {/* Main Image */}
          <motion.div
            whileHover={reduceMotion ? {} : { rotateY: -4, rotateX: 3, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{ transformPerspective: 1000 }}
            className="relative overflow-hidden rounded-3xl border border-white bg-white/60 p-3 shadow-2xl shadow-blue-900/10 backdrop-blur-sm"
          >
            <Image
              src="/banner.png"
              alt="DoctorTraker healthcare management"
              width={1440}
              height={810}
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </motion.div>

          {/* Floating Card */}
          <motion.div
            animate={
              reduceMotion ? {} : { y: [0, -12, 0], rotate: [0, 1, 0] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8"
          >
            <motion.div
              animate={reduceMotion ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="rounded-xl bg-blue-100 p-3 text-blue-600"
            >
              <Stethoscope size={25} />
            </motion.div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Doctor Management
              </p>
              <p className="text-xs text-slate-500">
                Everything in one place
              </p>
            </div>
          </motion.div>

          {/* Top Floating Status */}
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute -right-2 top-5 flex items-center gap-2 rounded-xl border border-white bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md sm:-right-5"
          >
            <motion.span
              animate={reduceMotion ? {} : { scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2.5 w-2.5 rounded-full bg-emerald-500"
            />
            <span className="text-xs font-semibold text-slate-700">
              Smart Healthcare
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
