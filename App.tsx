
import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_GROUPS } from './constants';
import { DailyReport, EquipmentGroup, Equipment, EquipmentStatus } from './types';
import EquipmentRow from './components/EquipmentRow';
import { formatReportToText } from './utils/formatter';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const getInitialShift = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 14) return 'MANHÃ';
  if (hour >= 14 && hour < 22) return 'TARDE';
  return 'NOITE';
};

const App: React.FC = () => {
  const [report, setReport] = useState<DailyReport>({
    id: crypto.randomUUID(),
    date: new Date().toLocaleDateString('pt-BR'),
    shift: getInitialShift(),
    team: 'C',
    operator: '',
    groups: JSON.parse(JSON.stringify(INITIAL_GROUPS)), // Deep copy
    observations: '',
    createdAt: Date.now()
  });

  const [savedReports, setSavedReports] = useState<DailyReport[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pumping_reports');
    if (saved) {
      try {
        setSavedReports(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar histórico", e);
      }
    }
  }, []);

  const handleUpdateItem = (groupIndex: number, updatedItem: Equipment) => {
    setReport(prev => {
      const newGroups = [...prev.groups];
      const itemIndex = newGroups[groupIndex].items.findIndex(i => i.id === updatedItem.id);
      newGroups[groupIndex].items[itemIndex] = updatedItem;
      return { ...prev, groups: newGroups };
    });
  };

  const handleSave = () => {
    if (!report.operator) {
      alert("Por favor, preencha o nome do operador antes de salvar.");
      return;
    }
    const newSaved = [report, ...savedReports.filter(r => r.id !== report.id)].slice(0, 20);
    setSavedReports(newSaved);
    localStorage.setItem('pumping_reports', JSON.stringify(newSaved));
    alert('Relatório arquivado com sucesso!');
  };

  const handleNewReport = () => {
    if (confirm("Deseja iniciar um novo checklist? Os dados atuais serão perdidos se não salvos.")) {
      setReport({
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString('pt-BR'),
        shift: getInitialShift(),
        team: 'C',
        operator: '',
        groups: JSON.parse(JSON.stringify(INITIAL_GROUPS)),
        observations: '',
        createdAt: Date.now()
      });
      setShowPreview(false);
    }
  };

  const loadReport = (r: DailyReport) => {
    setReport(r);
    setShowHistory(false);
    setShowPreview(false);
  };

  const handleCopy = () => {
    const text = formatReportToText(report);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statsData = useMemo(() => {
    const stats = {
      [EquipmentStatus.RUNNING]: 0,
      [EquipmentStatus.STOPPED]: 0,
      [EquipmentStatus.STANDBY]: 0,
      [EquipmentStatus.ANOMALY]: 0,
    };
    report.groups.forEach(g => g.items.forEach(i => stats[i.status]++));
    return [
      { name: 'Rodando', value: stats[EquipmentStatus.RUNNING], color: '#22c55e' },
      { name: 'Parado', value: stats[EquipmentStatus.STOPPED], color: '#ef4444' },
      { name: 'Standby', value: stats[EquipmentStatus.STANDBY], color: '#eab308' },
      { name: 'Anomalia', value: stats[EquipmentStatus.ANOMALY], color: '#f97316' },
    ].filter(s => s.value > 0);
  }, [report.groups]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar Superior */}
      <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              className="bg-indigo-500 p-2 rounded-lg shadow-inner"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">JACLA CELL</h1>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Checklist Diário</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHistory(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300"
              title="Histórico"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button 
              onClick={handleNewReport}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300"
              title="Novo Relatório"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div className="w-px h-6 bg-white/20 mx-1"></div>
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg ${
                showPreview ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              {showPreview ? '📝 Voltar' : '👁️ Visualizar'}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 lg:p-8">
        <AnimatePresence mode="wait">
          {!showPreview ? (
            <motion.div 
              key="edit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Coluna Esquerda: Formulários */}
              <div className="lg:col-span-8 space-y-6">
                {/* Header Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calendário</label>
                      <input 
                        type="text" value={report.date} 
                        onChange={e => setReport(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 h-9 px-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Turno Atual</label>
                      <select 
                        value={report.shift} 
                        onChange={e => setReport(prev => ({ ...prev, shift: e.target.value }))}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 h-9 px-2"
                      >
                        <option value="MANHÃ">MANHÃ</option>
                        <option value="TARDE">TARDE</option>
                        <option value="NOITE">NOITE</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Turma Operacional</label>
                      <select 
                        value={report.team} 
                        onChange={e => setReport(prev => ({ ...prev, team: e.target.value }))}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 h-9 px-2"
                      >
                        <option value="A">TURMA A</option>
                        <option value="B">TURMA B</option>
                        <option value="C">TURMA C</option>
                        <option value="D">TURMA D</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Responsável</label>
                      <input 
                        type="text" placeholder="Nome Completo"
                        value={report.operator} 
                        onChange={e => setReport(prev => ({ ...prev, operator: e.target.value }))}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 h-9 px-3"
                      />
                    </div>
                  </div>
                </div>

                {/* Lista de Equipamentos */}
                <div className="space-y-4">
                  {report.groups.map((group, gIdx) => (
                    <motion.div 
                      key={group.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                    >
                      <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                          {group.name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400">{group.items.length} ITENS</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {group.items.map((item) => (
                          <EquipmentRow 
                            key={item.id} 
                            item={item} 
                            onUpdate={(updated) => handleUpdateItem(gIdx, updated)} 
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Campo de Observações */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <label className="text-sm font-bold text-slate-700">Relatório de Ocorrências</label>
                  </div>
                  <textarea 
                    rows={4}
                    value={report.observations}
                    onChange={e => setReport(prev => ({ ...prev, observations: e.target.value }))}
                    placeholder="Descreva detalhadamente qualquer desvio operacional..."
                    className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm p-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center justify-between">
                      Disponibilidade SCADA
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full uppercase tracking-tighter">Real-time</span>
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={85}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                          >
                            {statsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Legend iconType="circle" />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                    >
                      Arquivar Dados
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopy}
                      className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all"
                    >
                      {copied ? 'Copiado!' : 'Exportar Relatório'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto w-full"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xs">DOC</div>
                     <div>
                       <h2 className="font-bold text-lg">CHECKLIST DIÁRIO</h2>
                       <p className="text-[10px] text-slate-400 font-mono">JACLA CELL OPERATIONAL SYSTEM</p>
                     </div>
                  </div>
                  <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="p-10 bg-slate-50 overflow-y-auto max-h-[70vh]">
                  <pre className="bg-white p-8 rounded-2xl border border-slate-200 whitespace-pre-wrap text-xs md:text-sm font-mono text-slate-800 shadow-sm leading-relaxed">
                    {formatReportToText(report)}
                  </pre>
                </div>
                <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 bg-white">
                  <button onClick={() => window.print()} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">Imprimir PDF</button>
                  <button onClick={handleCopy} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg">
                    {copied ? 'Link Copiado!' : 'Copiar Texto'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHistory(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">Arquivo JACLA CELL</h3>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {savedReports.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 italic">Nenhum relatório arquivado.</div>
                ) : (
                  savedReports.map(r => (
                    <button key={r.id} onClick={() => loadReport(r)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-slate-800">{r.date}</span>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Abrir</span>
                      </div>
                      <div className="text-xs text-slate-500">{r.shift} | TURMA {r.team} | {r.operator || 'Sem Nome'}</div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-slate-200 p-4 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          CHECKLIST DIÁRIO DE JACLA CELL | © 2026 Operação Industrial
        </p>
      </footer>
    </div>
  );
};

export default App;
